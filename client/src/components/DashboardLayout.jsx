import Navbar from './Navbar'
export default function DashboardLayout({ children }) 
{ return <div className="app-shell"><Navbar /> <main className="main-content">{children}</main></div> }
