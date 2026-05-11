const BASE = '/api'
async function req(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
export const api = {
  getUsers: () => req('/users'),
  login: (username, avatar_color) => req('/users/login', { method:'POST', body:{username,avatar_color} }),
  getStickers: (userId) => req(`/stickers?userId=${userId}`),
  setStatus: (userId, stickerId, status) => req(`/collection/${userId}/${stickerId}`, { method:'PATCH', body:{status} }),
  bulkAdd: (userId, numbers, status='owned') => req(`/collection/${userId}/bulk`, { method:'POST', body:{numbers,status} }),
  getLeaderboard: () => req('/stats/leaderboard'),
  getTeamStats: (userId) => req(`/stats/teams/${userId}`),
  getTrades: (userId) => req(`/trades/${userId}`),
  getActivity: () => req('/activity'),
  exportCollection: (userId) => req(`/export/${userId}`),
  importCollection: (userId, collection) => req(`/import/${userId}`, { method:'POST', body:{collection} }),
}
