import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import DashboardNovios from './pages/DashboardNovios';
import DashboardPlanner from './pages/DashboardPlanner';
import Tareas from './pages/Tareas';
import Finanzas from './pages/Finanzas';
import Mas from './pages/Mas';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<DashboardNovios />} />
          <Route path="/dashboard" element={<DashboardNovios />} />
          <Route path="/dashboard-planner" element={<DashboardPlanner />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/finanzas" element={<Finanzas />} />
          <Route path="/mas" element={<Mas />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}
