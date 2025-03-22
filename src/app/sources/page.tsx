import { arabicNewsSources } from '../../lib/api';

export default function SourcesPage() {
  // Organiser les sources par catégorie
  const sourcesByCategory = arabicNewsSources.reduce((acc, source) => {
    if (!acc[source.category]) {
      acc[source.category] = [];
    }
    acc[source.category].push(source);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Sources d'actualités arabes
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-3xl mx-auto">
        Notre site agrège des informations provenant de sources fiables et diverses du monde arabe pour vous offrir une vue complète de l'actualité.
      </p>
      
      {Object.entries(sourcesByCategory).map(([category, sources]) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {category === 'news' ? 'Chaînes d\'information' : 'Journaux et magazines'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.map((source) => (
              <div 
                key={source.username}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{source.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">@{source.username}</p>
                <a 
                  href={`https://twitter.com/${source.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Voir sur Twitter
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Vous connaissez d'autres sources?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Si vous connaissez d'autres sources d'actualités arabes fiables que nous devrions inclure, n'hésitez pas à nous contacter.
        </p>
        <a 
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Suggérer une source
        </a>
      </div>
    </div>
  );
}
