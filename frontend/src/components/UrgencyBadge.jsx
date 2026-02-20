import { Zap, AlertTriangle, TrendingUp, Eye } from 'lucide-react'

const config = {
  critical: {
    bg: 'bg-red-500/10 border-red-500/30',
    text: 'text-red-400',
    icon: Zap,
    label: 'WAVE ALERT',
    pulse: true,
  },
  high: {
    bg: 'bg-orange-500/10 border-orange-500/30',
    text: 'text-orange-400',
    icon: AlertTriangle,
    label: 'TREND SPIKE',
    pulse: true,
  },
  medium: {
    bg: 'bg-yellow-500/10 border-yellow-500/30',
    text: 'text-yellow-400',
    icon: TrendingUp,
    label: 'VELOCITY ALERT',
    pulse: false,
  },
  low: {
    bg: 'bg-gray-500/10 border-gray-500/30',
    text: 'text-gray-400',
    icon: Eye,
    label: 'WATCHING',
    pulse: false,
  },
}

export default function UrgencyBadge({ urgency }) {
  const c = config[urgency] || config.low
  const Icon = c.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold tracking-wide ${c.bg} ${c.text}`}
    >
      {c.pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.text.replace('text-', 'bg-')}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${c.text.replace('text-', 'bg-')}`} />
        </span>
      )}
      <Icon size={12} />
      {c.label}
    </span>
  )
}
