'use client';

import { useState, useEffect } from "react";
import { PropertyCard } from "../components/properties/PropertyCard";
import { FilterBar, FilterState } from "../components/properties/FilterBar";
import { Property } from "../types/property";

export default function Home() {
  // Starea filtrelor (rămâne la fel)
  const [filters, setFilters] = useState<FilterState>({
    type: 'toate',
    rooms: 'toate',
    maxPrice: ''
  });

  // Stare nouă pentru proprietățile aduse din backend
  const [properties, setProperties] = useState<Property[]>([]);
  // Stare pentru a arăta un mesaj de încărcare cât timp așteptăm datele
  const [isLoading, setIsLoading] = useState(true);

  // useEffect se va apela automat la prima randare a paginii
  // și ori de câte ori se modifică starea `filters`
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      
      try {
        // Construim parametrii URL-ului dinamic în funcție de filtrele selectate
        const params = new URLSearchParams();
        if (filters.type !== 'toate') params.append('type', filters.type);
        if (filters.rooms !== 'toate') params.append('rooms', filters.rooms);
        if (filters.maxPrice !== '') params.append('maxPrice', filters.maxPrice);

        // Facem request-ul către API-ul nostru de Spring Boot
        const response = await fetch(`http://localhost:8080/api/properties/search?${params.toString()}`);
        
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error("Eroare la preluarea datelor de la server");
        }
      } catch (error) {
        console.error("Eroare de rețea:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [filters]); // Array-ul de dependențe: când se schimbă filters, relansăm funcția

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-12 px-4 pb-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
        Descoperă <span className="text-blue-600">Noua Ta Casă</span>
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        Cele mai noi oferte imobiliare, actualizate zilnic.
      </p>
      
      {/* Bara de Filtre */}
      <FilterBar filters={filters} onFilterChange={setFilters} />
      
      {/* Grila cu rezultate */}
      <div className="w-full max-w-7xl">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-500 text-sm font-medium">
              Am găsit {properties.length} {properties.length === 1 ? 'rezultat' : 'rezultate'}
            </div>

            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nu am găsit proprietăți</h3>
                <p className="text-gray-500">Încearcă să modifici filtrele pentru a vedea mai multe rezultate.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}