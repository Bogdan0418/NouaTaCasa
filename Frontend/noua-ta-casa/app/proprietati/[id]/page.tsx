// app/proprietati/[id]/page.tsx
import Link from "next/link";
import { Property } from "../../../types/property";

// Funcția care face request-ul pe partea de server
async function getProperty(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`http://localhost:8080/api/properties/${id}`, {
      cache: "no-store", // La un marketplace, vrem date proaspete mereu
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Eroare la preluarea datelor:", error);
    return null;
  }
}

// Observă noul tip pentru params: Promise<{ id: string }>
export default async function PropertyDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Despachetăm promisiunea pentru a extrage ID-ul din URL
  const resolvedParams = await params;
  
  // Apelăm API-ul de Spring Boot cu ID-ul obținut
  const property = await getProperty(resolvedParams.id);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Proprietatea nu a fost găsită</h1>
        <Link href="/" className="text-blue-600 hover:underline font-medium">&larr; Înapoi la căutare</Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('ro-RO').format(property.price);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/" className="inline-block text-blue-600 hover:underline mb-6 font-medium">
        &larr; Înapoi la rezultate
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
        {/* Imaginea principală (Hero) */}
        <div className="w-full h-[400px] md:h-[500px] relative bg-gray-200">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-gray-800 uppercase tracking-wider shadow-sm">
            {property.type}
          </div>
        </div>

        {/* Detalii conținut */}
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8 border-b border-gray-100 pb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                {property.title}
              </h1>
              <p className="text-gray-500 flex items-center text-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {property.location}
              </p>
            </div>
            
            <div className="bg-blue-50 px-6 py-4 rounded-2xl text-center shrink-0">
              <span className="block text-sm text-blue-600 font-semibold mb-1 uppercase tracking-wide">Preț listat</span>
              <span className="text-3xl font-bold text-blue-700">{formattedPrice} €</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 text-sm mb-1">Suprafață utilă</p>
              <p className="text-xl font-bold text-gray-900">{property.surface} mp</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 text-sm mb-1">Număr camere</p>
              <p className="text-xl font-bold text-gray-900">{property.rooms}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 text-sm mb-1">Tip Tranzacție</p>
              <p className="text-xl font-bold text-gray-900 text-green-600">Vânzare</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Descrierea proprietății</h3>
            <p className="text-gray-600 leading-relaxed">
              Această proprietate spectaculoasă din {property.location} vă oferă un confort deosebit, 
              având {property.rooms} camere spațioase și o suprafață utilă de {property.surface} mp. 
              Finisajele sunt de înaltă calitate, iar poziționarea asigură un nivel maxim de lumină naturală.
              Este locul perfect pe care îl poți numi acasă. Pentru mai multe detalii și vizionări, vă rugăm să ne contactați.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}