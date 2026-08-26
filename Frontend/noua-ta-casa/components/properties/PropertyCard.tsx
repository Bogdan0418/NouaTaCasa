// components/properties/PropertyCard.tsx
import Link from 'next/link';
import { Property } from '../../types/property';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Formatăm prețul pentru a arăta cu punct (ex: 120.000)
  const formattedPrice = new Intl.NumberFormat('ro-RO').format(property.price);

  return (
    <Link href={`/proprietati/${property.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        
        {/* Imaginea imobilului cu verificare pentru URL gol */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {property.imageUrl ? (
            <img 
              src={property.imageUrl} 
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            // Placeholder vizual dacă nu avem imagine
            <div className="flex flex-col items-center text-gray-400">
              <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider">Fără imagine</span>
            </div>
          )}
          
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 uppercase tracking-wide">
            {property.type}
          </div>
        </div>

        {/* Detaliile imobilului */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
            {formattedPrice} €
          </h3>
          <p className="text-gray-600 text-sm font-medium mb-3 truncate">
            {property.title}
          </p>
          
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{property.location}</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-gray-500 text-sm">
              <span className="flex items-center">
                 <strong className="text-gray-900 mr-1">{property.rooms}</strong> cam.
              </span>
              <span className="flex items-center">
                 <strong className="text-gray-900 mr-1">{property.surface}</strong> mp
              </span>
            </div>
            <span className="text-blue-600 font-medium text-sm group-hover:underline">
              Vezi detalii &rarr;
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}