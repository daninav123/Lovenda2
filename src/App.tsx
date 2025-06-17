import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Finance from './pages/Finance'
import More from './pages/More'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="finance" element={<Finance />} />
          <Route path="more" element={<More />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
