import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import BlogPage from './pages/BlogPage';
import DigitalLibrary from './pages/DigitalLibrary';
import PhotoContest from './pages/PhotoContest';
import PatrimonyRegistry from './pages/PatrimonyRegistry';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin/*"
              element={
                isAuthenticated ?
                <AdminDashboard /> :
                <div className="container mx-auto px-4 py-20 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Acceso Restringido
                  </h2>
                  <p className="text-gray-600">
                    Debes iniciar sesión para acceder al panel de administración.
                  </p>
                </div>
              }
            />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/biblioteca" element={<DigitalLibrary />} />
            <Route path="/concurso-fotografico" element={<PhotoContest />} />
            <Route path="/registro-patrimonial" element={<PatrimonyRegistry />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;