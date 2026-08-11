import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import Loader from './components/ui/Loader';
import HomePage from './pages/HomePage';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="noise-overlay">
      <CustomCursor variant={cursorVariant} />
      <ScrollProgress />
      <Navbar setCursorVariant={setCursorVariant} />
      <AnimatePresence mode="wait">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-bg">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage setCursorVariant={setCursorVariant} />} />
            <Route path="/work/:slug" element={<ProjectDetail setCursorVariant={setCursorVariant} />} />
            <Route path="/project/:slug" element={<ProjectDetail setCursorVariant={setCursorVariant} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer setCursorVariant={setCursorVariant} />
    </div>
  );
}
