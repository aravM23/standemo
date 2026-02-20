import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.core.config import settings
from app.core.database import init_db
from app.api.users import router as users_router
from app.api.creators import router as creators_router
from app.api.alerts import router as alerts_router
from app.services.scanner import run_velocity_scan

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    logger.info("Database initialized")

    scheduler.add_job(
        run_velocity_scan,
        "interval",
        minutes=settings.polling_interval_minutes,
        id="velocity_scan",
        name="Velocity Scan",
        replace_existing=True,
    )
    scheduler.start()
    logger.info(
        f"Velocity scanner started (every {settings.polling_interval_minutes} min)"
    )

    yield

    scheduler.shutdown()
    logger.info("Scheduler stopped")


app = FastAPI(
    title="Stanley Velocity Alerts",
    description=(
        "Detects algorithmic trend spikes from competitor creators and pushes "
        "high-urgency, pre-drafted notifications before the wave peaks."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix="/api")
app.include_router(creators_router, prefix="/api")
app.include_router(alerts_router, prefix="/api")


@app.get("/health")
async def health():
    return {
        "status": "operational",
        "scanner_running": scheduler.running,
        "polling_interval_min": settings.polling_interval_minutes,
        "spike_threshold": settings.velocity_spike_threshold,
    }
