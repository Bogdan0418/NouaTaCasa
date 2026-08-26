// src/components/layout/Navbar.tsx
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Partea Stângă: Logo și Link-uri principale */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {/* Vom folosi text momentan, poți adăuga un SVG mai târziu */}
              <span className="font-bold text-2xl text-blue-600 tracking-tight">NouaTaCasa</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link 
                href="/vanzari" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-blue-500 transition-colors"
              >
                Vânzări
              </Link>
              <Link 
                href="/inchirieri" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-blue-500 transition-colors"
              >
                Închirieri
              </Link>
              <Link 
                href="/agentii" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-blue-500 transition-colors"
              >
                Agenții Imobiliare
              </Link>
            </div>
          </div>

          {/* Partea Dreaptă: Acțiuni utilizator */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Intră în cont
            </Link>
            <Link 
              href="/adauga-anunt" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Adaugă Anunț
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}