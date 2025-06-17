import { Outlet, Link } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/finance">Finance</Link>
        <Link to="/more">More</Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
