// components/properties/FilterBar.tsx
import { ChangeEvent } from 'react';

export interface FilterState {
  type: string;
  rooms: string;
  maxPrice: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  // Funcție generică pentru actualizarea unui singur filtru
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mb-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
      
      {/* Filtru Tip Imobil */}
      <div className="flex-1">
        <label htmlFor="type" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Tip Proprietate
        </label>
        <select
          id="type"
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-colors"
        >
          <option value="toate">Toate tipurile</option>
          <option value="apartament">Apartament</option>
          <option value="casa">Casă / Vilă</option>
        </select>
      </div>

      {/* Filtru Număr Camere */}
      <div className="flex-1">
        <label htmlFor="rooms" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Număr Camere
        </label>
        <select
          id="rooms"
          name="rooms"
          value={filters.rooms}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-colors"
        >
          <option value="toate">Oricâte</option>
          <option value="1">1 Cameră (Garsonieră)</option>
          <option value="2">2 Camere</option>
          <option value="3">3 Camere</option>
          <option value="4">4+ Camere</option>
        </select>
      </div>

      {/* Filtru Preț Maxim */}
      <div className="flex-1">
        <label htmlFor="maxPrice" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Preț Maxim (€)
        </label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="Ex: 150000"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-colors"
        />
      </div>

    </div>
  );
}