import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const routes: Record<string, string> = {
  program: 'Программа курса',
  privacy: 'Политика конфиденциальности',
  terms: 'Публичная оферта'
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <div className="bg-black/30 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">
            {routes[pathnames[0]]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;