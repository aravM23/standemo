import { RefreshCw, Radar } from 'lucide-react'
import { useState } from 'react'

export default function ScanButton({ onScan }) {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)

  async function handleScan() {
    setScanning(true)
    setResult(null)
    try {
      const res = await onScan()
      setResult(res)
    } catch {
      setResult({ error: true })
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleScan}
        disabled={scanning}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          scanning
            ? 'bg-stan-accent/20 text-stan-accent cursor-wait'
            : 'bg-stan-accent text-white hover:bg-stan-accent/80'
        }`}
      >
        {scanning ? (
          <RefreshCw size={14} className="animate-spin" />
        ) : (
          <Radar size={14} />
        )}
        {scanning ? 'Scanning...' : 'Run Velocity Scan'}
      </button>

      {result && !result.error && (
        <span className="text-xs text-white/40">
          {result.posts_scanned} posts / {result.spikes_detected} spikes / {result.alerts_generated} alerts
        </span>
      )}
    </div>
  )
}
