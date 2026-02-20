import { Activity, Flame, Bell, Clock } from 'lucide-react'

export default function StatsBar({ alerts, feed }) {
  const stats = [
    {
      label: 'Active Spikes',
      value: feed?.spike_count ?? '-',
      icon: Flame,
      color: 'text-orange-400',
    },
    {
      label: 'Pending Alerts',
      value: alerts?.pending_count ?? '-',
      icon: Bell,
      color: 'text-stan-accent',
    },
    {
      label: 'Total Alerts',
      value: alerts?.total ?? '-',
      icon: Activity,
      color: 'text-white/50',
    },
    {
      label: 'Last Scan',
      value: feed?.last_scan_at
        ? new Date(feed.last_scan_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'Never',
      icon: Clock,
      color: 'text-white/50',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-stan-card border border-stan-border"
        >
          <s.icon size={16} className={s.color} />
          <div>
            <p className="text-lg font-semibold leading-none">{s.value}</p>
            <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
