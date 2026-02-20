import { Clock, ExternalLink, ChevronDown, ChevronUp, Play, X } from 'lucide-react'
import { useState } from 'react'
import UrgencyBadge from './UrgencyBadge'

export default function AlertCard({ alert, onAct, onDismiss }) {
  const [expanded, setExpanded] = useState(false)

  const peakHours = alert.estimated_peak_hours
  const peakLabel =
    peakHours != null
      ? peakHours < 1
        ? 'Peaking NOW'
        : `~${Math.round(peakHours)}h until peak`
      : null

  return (
    <div
      className={`relative rounded-xl border transition-all duration-300 ${
        alert.urgency === 'critical'
          ? 'bg-red-950/20 border-red-500/20 shadow-lg shadow-red-500/5'
          : alert.urgency === 'high'
          ? 'bg-orange-950/20 border-orange-500/20 shadow-lg shadow-orange-500/5'
          : 'bg-stan-card border-stan-border'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <UrgencyBadge urgency={alert.urgency} />
              {peakLabel && (
                <span className="flex items-center gap-1 text-xs text-white/50">
                  <Clock size={12} />
                  {peakLabel}
                </span>
              )}
            </div>

            <h3 className="text-[15px] font-semibold text-white/90 leading-snug mb-1">
              {alert.alert_headline}
            </h3>

            <div className="flex items-center gap-4 mt-3 text-xs text-white/40">
              <span className="font-mono">
                {alert.velocity_multiplier.toFixed(1)}x velocity
              </span>
              <span>{alert.views_at_detection?.toLocaleString()} views</span>
              <span>{alert.hours_since_post?.toFixed(0)}h ago</span>
              {alert.detected_format && (
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/50">
                  {alert.detected_format}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            {alert.status !== 'acted_on' && alert.status !== 'dismissed' && (
              <>
                <button
                  onClick={() => onAct?.(alert.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stan-accent text-white text-xs font-medium hover:bg-stan-accent/80 transition-colors"
                >
                  <Play size={12} />
                  Open Draft
                </button>
                <button
                  onClick={() => onDismiss?.(alert.id)}
                  className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                >
                  <X size={14} />
                </button>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-4 text-xs text-stan-accent hover:text-stan-accent/80 transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide draft' : 'View draft & structure'}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-stan-border px-5 py-4 space-y-4">
          {alert.draft_hook && (
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/30 mb-1.5 font-medium">
                Your Hook
              </p>
              <p className="text-sm text-white/80 leading-relaxed bg-white/5 rounded-lg p-3 font-medium">
                "{alert.draft_hook}"
              </p>
            </div>
          )}

          {alert.draft_structure?.visual_beats && (
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/30 mb-1.5 font-medium">
                Visual Beats
              </p>
              <ol className="space-y-1.5">
                {(Array.isArray(alert.draft_structure.visual_beats)
                  ? alert.draft_structure.visual_beats
                  : []
                ).map((beat, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-white/60"
                  >
                    <span className="text-stan-accent font-mono text-xs mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {beat}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {alert.rewrite_rationale && (
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/30 mb-1.5 font-medium">
                Why This Works
              </p>
              <p className="text-sm text-white/50 leading-relaxed">
                {alert.rewrite_rationale}
              </p>
            </div>
          )}

          {alert.draft_structure?.caption_draft && (
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/30 mb-1.5 font-medium">
                Caption Draft
              </p>
              <p className="text-sm text-white/60 leading-relaxed bg-white/5 rounded-lg p-3 whitespace-pre-wrap">
                {alert.draft_structure.caption_draft}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
