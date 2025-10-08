"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    try {
      const raw = localStorage.getItem("stss-auth")
      if (raw) {
        const parsed = JSON.parse(raw)
        setUser(parsed.user || null)
        setLanguage(parsed.language || "en")
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("stss-auth", JSON.stringify({ user, language }))
    } catch {}
  }, [user, language])

  const login = (username, role) => setUser({ username, role })
  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, logout, language, setLanguage }), [user, language])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
