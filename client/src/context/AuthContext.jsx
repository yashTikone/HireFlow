import { createContext, useEffect, useState } from 'react'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); const [loading, setLoading] = useState(true)
    useEffect(() => { const u = localStorage.getItem('user'); if (u) { try { setUser(JSON.parse(u)) } catch { localStorage.clear() } } setLoading(false) }, [])
    const login = (data, token) => { localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(data)); setUser(data) }
    const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null) }
    return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}
export default AuthContext
