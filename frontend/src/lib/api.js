const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(error.detail || 'Request failed')
  }
  return res.json()
}

export const api = {
  createUser: (data) => request('/users/', { method: 'POST', body: JSON.stringify(data) }),
  getUser: (id) => request(`/users/${id}`),
  updatePillars: (id, pillars) =>
    request(`/users/${id}/pillars`, { method: 'PATCH', body: JSON.stringify(pillars) }),

  trackCreator: (userId, handle) =>
    request(`/users/${userId}/creators/`, {
      method: 'POST',
      body: JSON.stringify({ instagram_handle: handle }),
    }),
  listCreators: (userId) => request(`/users/${userId}/creators/`),
  untrackCreator: (userId, creatorId) =>
    request(`/users/${userId}/creators/${creatorId}`, { method: 'DELETE' }),

  getAlerts: (userId, params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/users/${userId}/alerts${qs ? `?${qs}` : ''}`)
  },
  getAlert: (userId, alertId) => request(`/users/${userId}/alerts/${alertId}`),
  actOnAlert: (userId, alertId) =>
    request(`/users/${userId}/alerts/${alertId}/act`, { method: 'POST' }),
  dismissAlert: (userId, alertId) =>
    request(`/users/${userId}/alerts/${alertId}/dismiss`, { method: 'POST' }),

  getVelocityFeed: (userId) => request(`/users/${userId}/velocity-feed`),
  triggerScan: (userId) => request(`/users/${userId}/scan`, { method: 'POST' }),

  health: () => fetch('/health').then((r) => r.json()),
}
