import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProgramPage from './pages/ProgramPage';
import PricingPage from './pages/PricingPage';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';
import { useLessonProgress } from './hooks/useLessonProgress';
import LessonPage from './pages/LessonPage';

function App() {
  const [user] = useAuthState(auth);
  const { loadProgress } = useLessonProgress();

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user, loadProgress]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="program" element={<ProgramPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="lesson/1.1" element={<LessonPage />} />
          <Route path="privacy" element={<div className="pt-32">Политика конфиденциальности</div>} />
          <Route path="terms" element={<div className="pt-32">Публичная оферта</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;