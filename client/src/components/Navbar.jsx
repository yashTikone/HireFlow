import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import HireFlowLogo from './HireFlowLogo';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const homePath = user?.role === 'recruiter'
    ? '/recruiter/dashboard'
    : user
      ? '/candidate/dashboard'
      : '/';
  const links = user?.role === 'candidate'
    ? [
        ['/candidate/dashboard', 'Dashboard'],
        ['/jobs', 'Find Jobs'],
        ['/applications', 'Applications'],
        ['/profile', 'Profile'],
      ]
    : [
        ['/recruiter/dashboard', 'Dashboard'],
        ['/recruiter/jobs', 'My Jobs'],
        ['/recruiter/jobs/create', 'Post a Job'],
      ];

  return (
    <header className="topbar">
      <Link to={homePath} className="brand" aria-label="HireFlow home">
        <HireFlowLogo />
      </Link>

      {user && (
        <>
          <nav className="navlinks" aria-label="Main navigation">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-user">
            <ThemeToggle />
            <span className="avatar">{user.name?.[0]?.toUpperCase()}</span>
            <span className="user-name">{user.name}</span>
            <button
              className="ghost-btn"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Log out
            </button>
          </div>
        </>
      )}
    </header>
  );
}
