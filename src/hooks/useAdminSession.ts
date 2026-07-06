import { useCallback, useEffect, useState } from 'react'
import { clearAdminSession, getAdminSession, setAdminSession, type AdminCredentials } from '../lib/adminAuth'
import { verifyAdminSession } from '../lib/adminApi'

export function useAdminSession() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)

  const refresh = useCallback(async () => {
    const session = getAdminSession()
    if (!session) {
      setIsAdmin(false)
      setEmail(null)
      setChecking(false)
      return false
    }
    setChecking(true)
    try {
      const ok = await verifyAdminSession(session)
      setIsAdmin(ok)
      setEmail(ok ? session.email : null)
      if (!ok) clearAdminSession()
      return ok
    } catch {
      setIsAdmin(false)
      setEmail(null)
      clearAdminSession()
      return false
    } finally {
      setChecking(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const login = useCallback(
    async (credentials: AdminCredentials) => {
      const ok = await verifyAdminSession(credentials)
      if (!ok) return false
      setAdminSession(credentials)
      setIsAdmin(true)
      setEmail(credentials.email)
      return true
    },
    [],
  )

  const logout = useCallback(() => {
    clearAdminSession()
    setIsAdmin(false)
    setEmail(null)
  }, [])

  return { isAdmin, email, checking, login, logout, refresh }
}
