import { useState, useEffect, useCallback } from 'react'
import {
  Radar, Zap, TrendingUp, Flame, Clock, Bell, Activity,
  ChevronDown, ChevronUp, Play, X, ExternalLink, Eye,
  AlertTriangle, RefreshCw, Users, BarChart3, ArrowUpRight,
  Timer, Target, Sparkles, Radio
} from 'lucide-react'

// ─── Demo Data ────────────────────────────────────────────────
// Baked in so this works standalone with zero backend needed.

const DEMO_USER = {
  username: 'arav',
  handle: '@aravmathur',
  narrative: 'Balancing CS at Waterloo with my fashion startup',
  pillars: ['tech entrepreneurship', 'fashion', 'student life', 'building in public'],
}

const DEMO_ALERTS = [
  {
    id: 1,
    creator_handle: 'nabeel.ae',
    creator_name: 'Nabeel Ahmed',
    velocity_multiplier: 5.8,
    views_at_detection: 412000,
    hours_since_post: 2.4,
    detected_format: 'FOMO listicle',
    alert_headline: 'nabeel.ae just hit 412,000 views in 2h. Your draft is ready — tap to ride this wave before it peaks.',
    alert_body: 'nabeel.ae hit 412,000 views in just 2 hours using a FOMO listicle format. The algorithm is actively pushing this wave. I\'ve already reverse-engineered their exact visual beat structure and rewrote it using your core content pillars. Estimated window: ~4h before this wave peaks. Tap to open your draft flow.',
    draft_hook: '"5 things nobody tells you about running a fashion startup while still in school. Number 3 is why most people quit."',
    draft_structure: {
      visual_beats: [
        'Open straight to camera, mid-sentence energy — "I almost didn\'t post this because number 3 is genuinely uncomfortable"',
        'Quick cut montage: laptop screen with code → fabric swatches → Waterloo campus at night — show the tension visually',
        'The turn: "Here\'s what nobody warned me about doing both..." — pause, lean in, lower voice',
        'Rapid-fire list with text overlays: each "thing" gets 3-4 seconds max. Punch the delivery.',
        'Close on the real talk: "If you\'re trying to do two things at once, save this." CTA to comments.'
      ],
      format_breakdown: 'FOMO listicles with numbered hooks are triggering 3-6x engagement right now because they front-load curiosity and the "number X" pattern creates micro-commitments that boost watch-through rate — Instagram\'s #1 ranking signal.',
      adaptation_notes: 'Adapted from nabeel.ae\'s generic entrepreneurship angle to your specific CS + fashion startup duality — this tension is your unfair advantage in the hook.',
      cta: '"Drop a 🔥 if you\'re building something on the side while still in school"',
      caption_draft: '5 things nobody tells you about running a fashion startup while still in school.\n\nNumber 3 is why 90% of people quit.\n\n(Save this if you\'re building something on the side)\n\n#entrepreneurship #studentfounder #fashionstartup #buildinpublic #waterloo',
    },
    rewrite_rationale: 'nabeel.ae\'s post used a FOMO listicle with a "question" hook — the numbered format creates micro-commitments that boost watch-through rate. At 5.8x his baseline, the algorithm is in active distribution mode. Your version reframes this through the CS + fashion startup lens, which is a more specific tension than his generic entrepreneurship angle.',
    urgency: 'critical',
    status: 'pending',
    estimated_peak_hours: 3.8,
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 2,
    creator_handle: 'fashion.ceo',
    creator_name: 'Priya Sharma',
    velocity_multiplier: 3.9,
    views_at_detection: 185000,
    hours_since_post: 4.1,
    detected_format: 'storytime',
    alert_headline: 'fashion.ceo is at 3.9x their average using a storytime format. I already rewrote it for your pillars. Open your draft.',
    alert_body: 'fashion.ceo is running at 3.9x their normal engagement with a storytime reel. This format is triggering high early-retention signals. I\'ve built you a draft using your narrative (Balancing CS at Waterloo with my fashion startup). Window: ~5h remaining.',
    draft_hook: '"I almost dropped out of CS last month. Here\'s what actually happened."',
    draft_structure: {
      visual_beats: [
        'Cold open — walking shot, looking down, contemplative energy. Voice: "So I need to tell you something."',
        'Cut to desk setup — half code editor, half fashion sketches. "Last month I sat here for 6 hours and couldn\'t do either."',
        'The pivot moment: show the specific conversation or event that changed things. Make it REAL.',
        'Montage of the comeback — shipping code, new designs, the energy shift. Quick cuts, upbeat.',
        'Direct to camera close: "If you\'re at that breaking point, here\'s what I wish someone told me..." — end before the payoff to drive comments.'
      ],
      format_breakdown: 'Storytime reels with cliffhanger hooks are hitting because the unresolved tension drives completion rate above 80%. The algorithm reads this as extreme interest.',
      adaptation_notes: 'Priya\'s original was about almost quitting her brand. Your version hits harder because the CS + startup tension is more relatable to the 18-25 demo.',
      cta: '"Tell me in the comments — have you ever been at that point?"',
    },
    rewrite_rationale: 'Storytime format with cliffhanger opening. 3.9x velocity at 4 hours means the algorithm is still actively pushing. The "almost quit" narrative arc converts because it triggers both curiosity and identification. Your CS + fashion angle makes this more specific than her version.',
    urgency: 'high',
    status: 'pending',
    estimated_peak_hours: 5.2,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 3,
    creator_handle: 'techbro.fits',
    creator_name: 'Marcus Chen',
    velocity_multiplier: 2.8,
    views_at_detection: 94000,
    hours_since_post: 6.7,
    detected_format: 'hot take',
    alert_headline: 'techbro.fits is gaining traction (2.8x) with a hot take. Draft available if you want to catch this wave.',
    alert_body: 'techbro.fits is outperforming at 2.8x with a hot take. A draft is ready based on your content pillars if you want to move on this.',
    draft_hook: '"Unpopular opinion: your side project isn\'t failing because of time. It\'s failing because you won\'t pick a lane."',
    draft_structure: {
      visual_beats: [
        'Direct to camera, slightly aggressive energy — "I\'m going to say something that a lot of you won\'t like."',
        'The take: "Everyone says you can do both. Build the startup AND get the degree AND have a life. That\'s a lie."',
        'The nuance: "But here\'s what IS true..." — soften, show the real framework for making it work',
        'Your proof: show YOUR schedule, your actual calendar, the real tradeoffs you make',
        'Close: "You can do both. But not the way you think." — open loop to drive saves and shares.'
      ],
      format_breakdown: 'Hot takes with controversial hooks generate 2-4x saves because people either save to argue later or save because they agree but won\'t comment publicly.',
    },
    rewrite_rationale: 'Hot take format. 2.8x is above threshold but the wave may be starting to crest at 6.7 hours. Still worth catching if you can produce quickly. The "pick a lane" angle directly maps to your dual-track narrative.',
    urgency: 'medium',
    status: 'pending',
    estimated_peak_hours: 1.5,
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
]

const DEMO_FEED = [
  { creator_handle: 'nabeel.ae', creator_name: 'Nabeel Ahmed', views: 412000, velocity_multiplier: 5.8, hours_since_post: 2.4, detected_format: 'FOMO listicle', is_spike: true, alert_generated: true, caption_preview: '5 things nobody tells you about building a brand in 2026. Number 3 changed everything.' },
  { creator_handle: 'fashion.ceo', creator_name: 'Priya Sharma', views: 185000, velocity_multiplier: 3.9, hours_since_post: 4.1, detected_format: 'storytime', is_spike: true, alert_generated: true, caption_preview: 'I almost quit my brand last month. Here\'s what happened next...' },
  { creator_handle: 'techbro.fits', creator_name: 'Marcus Chen', views: 94000, velocity_multiplier: 2.8, hours_since_post: 6.7, detected_format: 'hot take', is_spike: true, alert_generated: true, caption_preview: 'Unpopular opinion: 90% of "hustle culture" advice is keeping you mediocre.' },
  { creator_handle: 'nabeel.ae', creator_name: 'Nabeel Ahmed', views: 78200, velocity_multiplier: 1.6, hours_since_post: 18.3, detected_format: 'tutorial', is_spike: false, alert_generated: false, caption_preview: 'Step by step: How I grew from 0 to 100k in 6 months (save this).' },
  { creator_handle: 'fashion.ceo', creator_name: 'Priya Sharma', views: 62100, velocity_multiplier: 1.3, hours_since_post: 22.5, detected_format: 'day in the life', is_spike: false, alert_generated: false, caption_preview: 'A day in my life running a fashion brand from my apartment.' },
  { creator_handle: 'techbro.fits', creator_name: 'Marcus Chen', views: 51800, velocity_multiplier: 1.1, hours_since_post: 31.2, detected_format: 'comparison', is_spike: false, alert_generated: false, caption_preview: 'Tech salary vs startup equity: which actually wins at 25?' },
  { creator_handle: 'nabeel.ae', creator_name: 'Nabeel Ahmed', views: 44500, velocity_multiplier: 0.9, hours_since_post: 48.0, detected_format: 'storytime', is_spike: false, alert_generated: false, caption_preview: 'The email that changed everything about how I create content.' },
  { creator_handle: 'fashion.ceo', creator_name: 'Priya Sharma', views: 38200, velocity_multiplier: 0.8, hours_since_post: 52.1, detected_format: 'tutorial', is_spike: false, alert_generated: false, caption_preview: 'How to shoot product photos with just your iPhone (save this).' },
  { creator_handle: 'techbro.fits', creator_name: 'Marcus Chen', views: 29100, velocity_multiplier: 0.6, hours_since_post: 71.4, detected_format: 'FOMO listicle', is_spike: false, alert_generated: false, caption_preview: '3 apps that replaced my entire productivity stack.' },
]

// ─── Utility ──────────────────────────────────────────────────

function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 100_000 ? 0 : 1)}k`
  return n.toString()
}

function timeAgo(iso) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// ─── Components ───────────────────────────────────────────────

const urgencyConfig = {
  critical: { bg: 'bg-red-500/10 border-red-500/25', text: 'text-red-400', icon: Zap, label: 'WAVE ALERT', pulse: true, glow: 'shadow-red-500/10', ring: 'ring-red-500/20' },
  high: { bg: 'bg-orange-500/10 border-orange-500/25', text: 'text-orange-400', icon: AlertTriangle, label: 'TREND SPIKE', pulse: true, glow: 'shadow-orange-500/10', ring: 'ring-orange-500/20' },
  medium: { bg: 'bg-yellow-500/10 border-yellow-500/25', text: 'text-yellow-400', icon: TrendingUp, label: 'VELOCITY ALERT', pulse: false, glow: '', ring: 'ring-yellow-500/20' },
  low: { bg: 'bg-zinc-500/10 border-zinc-500/25', text: 'text-zinc-400', icon: Eye, label: 'WATCHING', pulse: false, glow: '', ring: '' },
}

function UrgencyBadge({ urgency }) {
  const c = urgencyConfig[urgency] || urgencyConfig.low
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold tracking-wider ${c.bg} ${c.text}`}>
      {c.pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${c.text.replace('text-', 'bg-')}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${c.text.replace('text-', 'bg-')}`} />
        </span>
      )}
      <Icon size={11} />
      {c.label}
    </span>
  )
}

function AlertCard({ alert, onExpand, expanded, onAct, onDismiss }) {
  const c = urgencyConfig[alert.urgency] || urgencyConfig.low
  const peak = alert.estimated_peak_hours
  const peakLabel = peak != null ? (peak < 1 ? 'Peaking NOW' : `~${peak.toFixed(1)}h to peak`) : null

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
      alert.status === 'dismissed' ? 'opacity-40' :
      alert.urgency === 'critical' ? 'bg-red-950/30 border-red-500/15 shadow-lg ' + c.glow :
      alert.urgency === 'high' ? 'bg-orange-950/20 border-orange-500/15 shadow-lg ' + c.glow :
      'bg-[#111118] border-white/[0.06]'
    }`}>
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <UrgencyBadge urgency={alert.urgency} />
              {peakLabel && (
                <span className={`flex items-center gap-1 text-[11px] font-medium ${peak < 1 ? 'text-red-400' : peak < 3 ? 'text-orange-400' : 'text-white/40'}`}>
                  <Timer size={11} />
                  {peakLabel}
                </span>
              )}
              <span className="text-[11px] text-white/25">{timeAgo(alert.created_at)}</span>
            </div>

            <h3 className="text-[15px] font-semibold text-white/90 leading-snug">
              {alert.alert_headline}
            </h3>

            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] text-xs font-mono text-white/50">
                <ArrowUpRight size={11} className={alert.velocity_multiplier >= 5 ? 'text-red-400' : alert.velocity_multiplier >= 3 ? 'text-orange-400' : 'text-yellow-400'} />
                {alert.velocity_multiplier}x
              </span>
              <span className="text-xs text-white/35">{formatViews(alert.views_at_detection)} views</span>
              <span className="text-xs text-white/35">{alert.hours_since_post}h old</span>
              {alert.detected_format && (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400/80 border border-indigo-500/10">
                  {alert.detected_format}
                </span>
              )}
              <span className="text-xs text-white/30">@{alert.creator_handle}</span>
            </div>
          </div>

          {alert.status !== 'dismissed' && alert.status !== 'acted_on' && (
            <div className="flex gap-2 shrink-0 mt-1">
              <button onClick={() => onAct(alert.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-400 active:scale-95 transition-all shadow-lg shadow-indigo-500/20">
                <Play size={12} fill="currentColor" />
                Open Draft
              </button>
              <button onClick={() => onDismiss(alert.id)} className="p-2 rounded-xl text-white/20 hover:text-white/50 hover:bg-white/5 transition-colors">
                <X size={14} />
              </button>
            </div>
          )}
          {alert.status === 'acted_on' && (
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/15 font-medium">Drafting</span>
          )}
        </div>

        <button onClick={() => onExpand(alert.id)} className="flex items-center gap-1.5 mt-4 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Collapse' : 'View draft & beat structure'}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-white/[0.04] bg-white/[0.015]">
          <div className="p-5 space-y-5">
            {alert.draft_hook && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target size={12} className="text-indigo-400" />
                  <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold">Your Hook</p>
                </div>
                <p className="text-[15px] text-white/90 leading-relaxed bg-indigo-500/[0.06] rounded-xl p-4 font-medium border border-indigo-500/10">
                  {alert.draft_hook}
                </p>
              </div>
            )}

            {alert.draft_structure?.visual_beats && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={12} className="text-indigo-400" />
                  <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold">Visual Beat Structure</p>
                </div>
                <div className="space-y-2">
                  {alert.draft_structure.visual_beats.map((beat, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <span className="text-indigo-400/60 font-mono text-xs font-bold mt-0.5 shrink-0 w-6 text-right">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm text-white/60 leading-relaxed">{beat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {alert.draft_structure?.caption_draft && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={12} className="text-indigo-400" />
                  <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold">Caption Draft</p>
                </div>
                <p className="text-sm text-white/50 leading-relaxed bg-white/[0.03] rounded-xl p-4 whitespace-pre-wrap border border-white/[0.04]">
                  {alert.draft_structure.caption_draft}
                </p>
              </div>
            )}

            {alert.draft_structure?.cta && (
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold mb-1.5">CTA</p>
                <p className="text-sm text-white/60">{alert.draft_structure.cta}</p>
              </div>
            )}

            {alert.rewrite_rationale && (
              <div className="pt-3 border-t border-white/[0.04]">
                <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold mb-1.5">Why This Format Is Working</p>
                <p className="text-[13px] text-white/40 leading-relaxed">{alert.rewrite_rationale}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MultiplierBar({ value, isSpike }) {
  const pct = Math.min((value / 7) * 100, 100)
  return (
    <div className="flex items-center gap-2.5 flex-1 min-w-0">
      <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isSpike
              ? value >= 5 ? 'bg-gradient-to-r from-red-500 to-orange-400' : value >= 3 ? 'bg-gradient-to-r from-orange-500 to-yellow-400' : 'bg-gradient-to-r from-yellow-500 to-amber-400'
              : 'bg-white/10'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`font-mono text-xs tabular-nums font-medium w-10 text-right ${
        isSpike ? (value >= 5 ? 'text-red-400' : value >= 3 ? 'text-orange-400' : 'text-yellow-400') : 'text-white/25'
      }`}>
        {value.toFixed(1)}x
      </span>
    </div>
  )
}

function VelocityFeed({ items }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111118] overflow-hidden">
      <div className="divide-y divide-white/[0.03]">
        {items.map((item, i) => (
          <div key={i} className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${item.is_spike ? 'bg-white/[0.02] hover:bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}>
            <div className="w-5 flex justify-center shrink-0">
              {item.is_spike ? <Flame size={13} className="text-orange-400" /> : <span className="text-[11px] text-white/15 font-mono">{i + 1}</span>}
            </div>
            <div className="min-w-0 w-40 shrink-0">
              <p className="text-sm font-medium text-white/80 truncate">@{item.creator_handle}</p>
              <p className="text-[11px] text-white/25 truncate mt-0.5">{item.caption_preview}</p>
            </div>
            <MultiplierBar value={item.velocity_multiplier} isSpike={item.is_spike} />
            <div className="text-right shrink-0 w-16">
              <p className="text-xs font-mono text-white/50 font-medium">{formatViews(item.views)}</p>
              <p className="text-[10px] text-white/20 mt-0.5">{item.hours_since_post}h ago</p>
            </div>
            <div className="shrink-0 w-24 text-right">
              {item.detected_format && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/30">{item.detected_format}</span>
              )}
            </div>
            {item.alert_generated && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 font-medium shrink-0">alerted</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, color = 'text-white/50' }) {
  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-[#111118] border border-white/[0.06]">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.03] ${color}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xl font-bold leading-none tracking-tight">{value}</p>
        <p className="text-[11px] text-white/30 mt-1">{label}</p>
      </div>
      {sub && <p className="text-[10px] text-white/20 ml-auto self-end">{sub}</p>}
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState('alerts')
  const [expandedAlerts, setExpandedAlerts] = useState(new Set())
  const [alerts, setAlerts] = useState(DEMO_ALERTS)
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [liveTime, setLiveTime] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setLiveTime(Date.now()), 30000)
    return () => clearInterval(t)
  }, [])

  function toggleExpand(id) {
    setExpandedAlerts(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleAct(id) {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'acted_on' } : a))
    setExpandedAlerts(prev => { const next = new Set(prev); next.add(id); return next })
  }

  function handleDismiss(id) {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'dismissed' } : a))
  }

  function handleScan() {
    setScanning(true)
    setScanResult(null)
    setTimeout(() => {
      setScanning(false)
      setScanResult({ posts: 60, spikes: 3, alerts: 3 })
      setTimeout(() => setScanResult(null), 5000)
    }, 2200)
  }

  const pending = alerts.filter(a => a.status === 'pending').length
  const spikes = DEMO_FEED.filter(f => f.is_spike).length

  return (
    <div className="min-h-screen bg-[#08080d] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#08080d]/80 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Radar size={16} className="text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#08080d]" />
            </div>
            <div>
              <h1 className="text-[15px] font-bold tracking-tight">Stanley</h1>
              <p className="text-[10px] text-white/25 font-medium tracking-wide">VELOCITY ALERTS</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/20">
              <Radio size={10} className="text-green-400" />
              <span>Scanner active · 30m interval</span>
            </div>

            <button
              onClick={handleScan}
              disabled={scanning}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                scanning
                  ? 'bg-indigo-500/15 text-indigo-400'
                  : 'bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 shadow-lg shadow-indigo-500/20'
              }`}
            >
              {scanning ? <RefreshCw size={13} className="animate-spin" /> : <Radar size={13} />}
              {scanning ? 'Scanning...' : 'Run Scan'}
            </button>

            {scanResult && (
              <span className="text-[11px] text-white/30 animate-fade-in">
                {scanResult.posts} posts · {scanResult.spikes} spikes · {scanResult.alerts} alerts
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={Flame} label="Active Spikes" value={spikes} color="text-orange-400" />
          <StatCard icon={Bell} label="Pending Alerts" value={pending} color="text-indigo-400" />
          <StatCard icon={Users} label="Tracking" value="3 creators" color="text-white/40" />
          <StatCard icon={Clock} label="Last Scan" value="2m ago" color="text-white/40" sub="auto" />
        </div>

        {/* Context bar */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/[0.04] border border-indigo-500/10">
          <Sparkles size={14} className="text-indigo-400 shrink-0" />
          <p className="text-xs text-indigo-300/60">
            Monitoring competitors against your pillars: <span className="text-indigo-300/80 font-medium">{DEMO_USER.narrative}</span>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] w-fit">
          {[
            { key: 'alerts', label: 'Alerts', icon: Zap, count: pending },
            { key: 'feed', label: 'Velocity Feed', icon: TrendingUp },
          ].map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === key ? 'bg-white/[0.08] text-white shadow-sm' : 'text-white/35 hover:text-white/55'
              }`}
            >
              <Icon size={14} />
              {label}
              {count > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">{count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'alerts' && (
          <div className="space-y-3">
            {alerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                expanded={expandedAlerts.has(alert.id)}
                onExpand={toggleExpand}
                onAct={handleAct}
                onDismiss={handleDismiss}
              />
            ))}
          </div>
        )}

        {tab === 'feed' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-white/25">Ranked by velocity multiplier vs. creator baseline</p>
              <p className="text-[11px] text-white/15">{DEMO_FEED.length} posts tracked</p>
            </div>
            <VelocityFeed items={DEMO_FEED} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/[0.03] py-6">
        <p className="text-center text-[11px] text-white/15">
          Stanley Velocity Alerts · Tracking {DEMO_FEED.length} posts across 3 creators · Spike threshold: 2.5x
        </p>
      </footer>
    </div>
  )
}
