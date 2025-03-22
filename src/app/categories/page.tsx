export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Catégories d'actualités
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                <span className="text-2xl text-blue-600 dark:text-blue-400">{category.icon}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
            <a 
              href={`/category/${category.id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Explorer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const categories = [
  {
    id: 'politique',
    name: 'Politique',
    icon: '🏛️',
    description: 'Actualités politiques du monde arabe, relations internationales et diplomatie.'
  },
  {
    id: 'economie',
    name: 'Économie',
    icon: '💰',
    description: 'Informations économiques, marchés financiers et développement économique dans la région.'
  },
  {
    id: 'societe',
    name: 'Société',
    icon: '👥',
    description: 'Actualités sociales, culturelles et tendances dans les sociétés arabes.'
  },
  {
    id: 'sport',
    name: 'Sport',
    icon: '⚽',
    description: 'Actualités sportives, compétitions et événements sportifs dans le monde arabe.'
  },
  {
    id: 'technologie',
    name: 'Technologie',
    icon: '💻',
    description: 'Innovations technologiques, startups et transformation numérique dans la région.'
  },
  {
    id: 'culture',
    name: 'Culture',
    icon: '🎭',
    description: 'Art, littérature, musique et patrimoine culturel du monde arabe.'
  },
  {
    id: 'sante',
    name: 'Santé',
    icon: '🏥',
    description: 'Actualités médicales, santé publique et bien-être dans les pays arabes.'
  },
  {
    id: 'environnement',
    name: 'Environnement',
    icon: '🌍',
    description: 'Enjeux environnementaux, changement climatique et développement durable.'
  },
  {
    id: 'education',
    name: 'Éducation',
    icon: '🎓',
    description: 'Actualités sur l\'éducation, la recherche et l\'enseignement supérieur.'
  }
];
