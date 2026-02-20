import { useState } from 'react'
import { User, Plus, Crosshair } from 'lucide-react'

export default function SetupModal({ onComplete }) {
  const [step, setStep] = useState(0)
  const [username, setUsername] = useState('')
  const [handle, setHandle] = useState('')
  const [narrative, setNarrative] = useState('')
  const [topics, setTopics] = useState('')
  const [tone, setTone] = useState('')
  const [competitors, setCompetitors] = useState('')

  function handleSubmit() {
    onComplete({
      username,
      instagram_handle: handle || null,
      content_pillars: {
        primary_narrative: narrative,
        topics: topics.split(',').map((t) => t.trim()).filter(Boolean),
        tone,
        audience: '',
      },
      niche_tags: [],
      competitors: competitors.split(',').map((c) => c.trim()).filter(Boolean),
    })
  }

  const steps = [
    {
      title: 'Your identity',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="arav"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-stan-border text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-stan-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5">Instagram handle</label>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@yourhandle"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-stan-border text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-stan-accent transition-colors"
            />
          </div>
        </div>
      ),
      valid: username.length > 0,
    },
    {
      title: 'Your content pillars',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5">
              Primary narrative (what's your story?)
            </label>
            <input
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="Balancing CS with my fashion startup"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-stan-border text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-stan-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5">
              Core topics (comma separated)
            </label>
            <input
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="tech entrepreneurship, fashion, student life"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-stan-border text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-stan-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5">Brand tone</label>
            <input
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="authentic, direct, slightly irreverent"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-stan-border text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-stan-accent transition-colors"
            />
          </div>
        </div>
      ),
      valid: narrative.length > 0,
    },
    {
      title: 'Track competitors',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5">
              Instagram handles to track (comma separated)
            </label>
            <input
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="nabeel.ae, fashion.startup.daily, cs.to.ceo"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-stan-border text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-stan-accent transition-colors"
            />
          </div>
          <p className="text-xs text-white/30">
            Stanley will monitor these creators and alert you the moment their content
            spikes. Drafts will be rewritten using your pillars above.
          </p>
        </div>
      ),
      valid: competitors.length > 0,
    },
  ]

  const current = steps[step]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-stan-card border border-stan-border rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-stan-accent/20 flex items-center justify-center">
              {step === 0 && <User size={14} className="text-stan-accent" />}
              {step === 1 && <Plus size={14} className="text-stan-accent" />}
              {step === 2 && <Crosshair size={14} className="text-stan-accent" />}
            </div>
            <div>
              <h2 className="text-base font-semibold">{current.title}</h2>
              <p className="text-xs text-white/30">Step {step + 1} of {steps.length}</p>
            </div>
          </div>

          {current.content}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-stan-border">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-8 h-1 rounded-full transition-colors ${
                  i <= step ? 'bg-stan-accent' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!current.valid}
                className="px-4 py-2 rounded-lg bg-stan-accent text-white text-sm font-medium hover:bg-stan-accent/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!current.valid}
                className="px-4 py-2 rounded-lg bg-stan-accent text-white text-sm font-medium hover:bg-stan-accent/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Start Tracking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
