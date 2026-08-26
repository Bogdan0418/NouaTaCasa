// app/adauga-anunt/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdaugaAnuntPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Starea pentru datele formularului
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    rooms: '',
    surface: '',
    type: 'APARTAMENT', // Valoarea default, exact cum o așteaptă Java (enum-ul cu litere mari)
    imageUrl: ''
  });

  // Funcție generică pentru actualizarea stării la scrierea în input-uri
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Funcția care se apelează la trimiterea formularului
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenim reîncărcarea paginii
    setIsSubmitting(true);
    setError('');

    // Convertim valorile numerice (din string în număr, pentru Spring Boot)
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      rooms: parseInt(formData.rooms),
      surface: parseFloat(formData.surface),
    };

    try {
      const response = await fetch('http://localhost:8080/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Dacă a mers, redirecționăm utilizatorul către pagina principală
        router.push('/');
        router.refresh(); // Forțăm reîncărcarea datelor noi
      } else {
        setError('A apărut o eroare la salvarea proprietății. Verifică datele introduse.');
      }
    } catch (err) {
      setError('Eroare de conexiune la server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Adaugă un anunț nou</h1>
        <p className="text-gray-500 mb-8">Completează detaliile proprietății pe care dorești să o listezi pe NouaTaCasa.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titlu și Locație */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titlu Anunț *</label>
              <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange}
                placeholder="Ex: Apartament luminos vizavi de parc"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Locație *</label>
              <input type="text" id="location" name="location" required value={formData.location} onChange={handleChange}
                placeholder="Ex: București, Sector 1"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Preț, Camere, Suprafață, Tip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Preț (€) *</label>
              <input type="number" id="price" name="price" required min="1" value={formData.price} onChange={handleChange}
                placeholder="Ex: 85000"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">Camere *</label>
              <input type="number" id="rooms" name="rooms" required min="1" value={formData.rooms} onChange={handleChange}
                placeholder="Ex: 2"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="surface" className="block text-sm font-medium text-gray-700 mb-1">Suprafață (mp) *</label>
              <input type="number" id="surface" name="surface" required min="1" value={formData.surface} onChange={handleChange}
                placeholder="Ex: 55"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tip Imobil</label>
              <select id="type" name="type" value={formData.type} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="APARTAMENT">Apartament</option>
                <option value="CASA">Casă / Vilă</option>
              </select>
            </div>
          </div>

          {/* URL Imagine */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Link URL Imagine (opțional)</label>
            <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
              placeholder="Ex: https://images.unsplash.com/photo-..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Pune un link public către o imagine. Lăsat gol, nu va avea poză.</p>
          </div>

          {/* Buton Submit */}
          <div className="pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {isSubmitting ? 'Se publică anunțul...' : 'Publică Anunțul'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}