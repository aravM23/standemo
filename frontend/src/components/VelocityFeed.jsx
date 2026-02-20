import { TrendingUp, Flame, ExternalLink } from 'lucide-react'

function MultiplierBar({ value, isSpike }) {
  const width = Math.min((value / 8) * 100, 100)
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isSpike
              ? value >= 5
                ? 'bg-gradient-to-r from-red-500 to-orange-400'
                : 'bg-gradient-to-r from-orange-500 to-yellow-400'
              : 'bg-white/20'
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span
        className={`font-mono text-xs tabular-nums ${
          isSpike ? (value >= 5 ? 'text-red-400' : 'text-orange-400') : 'text-white/40'
        }`}
      >
        {value.toFixed(1)}x
      </span>
    </div>
  )
}

export default function VelocityFeed({ feed }) {
  if (!feed?.items?.length) {
    return (
      <div className="text-center py-12 text-white/30">
        <TrendingUp size={32} className="mx-auto mb-3 opacity-50" />
        <p className="text-sm">No velocity data yet. Add creators to track.</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {feed.items.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
            item.is_spike ? 'bg-white/[0.03] hover:bg-white/[0.05]' : 'hover:bg-white/[0.02]'
          }`}
        >
          <div className="w-5 flex justify-center">
            {item.is_spike ? (
              <Flame size={14} className="text-orange-400" />
            ) : (
              <span className="text-[11px] text-white/20 font-mono">{i + 1}</span>
            )}
          </div>

          <div className="min-w-0 w-36 shrink-0">
            <p className="text-sm font-medium text-white/80 truncate">
              @{item.creator_handle}
            </p>
            {item.caption_preview && (
              <p className="text-[11px] text-white/30 truncate mt-0.5">
                {item.caption_preview}
              </p>
            )}
          </div>

          <MultiplierBar value={item.velocity_multiplier} isSpike={item.is_spike} />

          <div className="text-right shrink-0 w-20">
            <p className="text-xs font-mono text-white/60">
              {item.views >= 1000
                ? `${(item.views / 1000).toFixed(item.views >= 10000 ? 0 : 1)}k`
                : item.views}
            </p>
            <p className="text-[10px] text-white/25">{item.hours_since_post?.toFixed(0)}h ago</p>
          </div>

          <div className="shrink-0 w-20 text-right">
            {item.detected_format && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40">
                {item.detected_format}
              </span>
            )}
          </div>

          {item.alert_generated && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-stan-accent/20 text-stan-accent shrink-0">
              alerted
            </span>
          )}

          {item.post_url && (
            <a
              href={item.post_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white/50 transition-colors shrink-0"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
