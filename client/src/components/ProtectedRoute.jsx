import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
export default function ProtectedRoute({ children, role }) 
{ const { user, loading } = useContext(AuthContext); const loc = useLocation(); if (loading) return <div className="screen-loader"><div className="spinner" /></div>; if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />; if (role && user.role !== role) return <Navigate to={user.role === 'candidate' ? '/candidate/dashboard' : '/recruiter/dashboard'} replace />; return children }
