import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import GiftModal from './GiftModal';
import { useGiftModal } from '../hooks/useGiftModal';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTokens } from '../hooks/useTokens';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { Coins } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const { tokens } = useTokens();
  const { clearProgress } = useLessonProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isOpen: showGiftModal, hideGiftModal } = useGiftModal();

  const handleAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    await auth.signOut();
    clearProgress();
    
    // Если пользователь на странице урока, перенаправляем на программу курса
    if (location.pathname.includes('/lesson')) {
      navigate('/program');
    }
  };

  return (
    <>
      <nav className="fixed w-full bg-black/50 backdrop-blur-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Brain className="w-8 h-8 text-red-500" />
            <span className="font-bold text-xl">BA Course</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Тарифы
                </Link>
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">{tokens}</span>
                </div>
                <span className="text-gray-400">{user.email}</span>
                <button 
                  className="btn-secondary"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Тарифы
                </Link>
                <button 
                  className="btn-secondary hidden md:block"
                  onClick={() => handleAuth('login')}
                >
                  Войти
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => handleAuth('register')}
                >
                  Регистрация
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />

      <GiftModal
        isOpen={showGiftModal}
        onClose={hideGiftModal}
      />
    </>
  );
};

export default Header;