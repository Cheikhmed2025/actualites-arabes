'use client';

import React, { useState, useEffect } from 'react';

// Types pour les tweets et sources
type Tweet = {
  id: string;
  text: string;
  created_at: string;
  user: {
    name: string;
    screen_name: string;
    profile_image_url: string;
  };
};

type NewsSource = {
  name: string;
  category: string;
  hasError: boolean;
};

// Composant pour afficher un tweet individuel
const TweetCard = ({ tweet }: { tweet: Tweet }) => {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        {tweet.user.profile_image_url && (
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              src={tweet.user.profile_image_url} 
              alt={`${tweet.user.name} profile`}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{tweet.user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{tweet.user.screen_name}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-2" dir="auto">{tweet.text}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
    </div>
  );
};

// Composant pour afficher la liste des sources
const SourcesList = ({ 
  sources, 
  activeSource, 
  onSourceChange 
}: { 
  sources: NewsSource[], 
  activeSource: string | null,
  onSourceChange: (source: string | null) => void 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Sources d'actualités</h2>
      <ul>
        <li 
          className={`py-2 px-3 cursor-pointer rounded-md ${activeSource === null ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          onClick={() => onSourceChange(null)}
        >
          Toutes les sources
        </li>
        {sources.map((source) => (
          <li 
            key={source.name}
            className={`py-2 px-3 cursor-pointer rounded-md ${activeSource === source.name ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => onSourceChange(source.name)}
          >
            {source.name} 
            <span className="text-xs ml-2 text-gray-500 dark:text-gray-400">({source.category})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Composant principal pour la page d'actualités
export default function NewsComponent() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour charger les actualités
  const loadNews = async () => {
    setLoading(true);
    try {
      // Construire l'URL de l'API avec les paramètres de recherche si nécessaire
      let apiUrl = '/api/news';
      if (searchQuery) {
        apiUrl += `?keyword=${encodeURIComponent(searchQuery)}`;
      }
      
      // Appel à l'API
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setTweets(data.tweets || []);
        setSources(data.sources || []);
        setError(null);
      }
    } catch (err) {
      setError('Impossible de charger les actualités. Veuillez réessayer plus tard.');
      console.error('Erreur lors du chargement des actualités:', err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les actualités au chargement du composant et lorsque la recherche change
  useEffect(() => {
    loadNews();
  }, [searchQuery]);

  // Gérer la soumission du formulaire de recherche
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('searchQuery') as string;
    setSearchQuery(query);
  };

  // Filtrer les tweets par source active
  const filteredTweets = activeSource 
    ? tweets.filter(tweet => tweet.user.name === activeSource)
    : tweets;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Actualités du Monde Arabe
      </h1>
      
      <div className="mb-6">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              name="searchQuery"
              placeholder="Rechercher des actualités..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              defaultValue={searchQuery}
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 bg-blue-600 text-white px-3 py-1 rounded-md"
            >
              Rechercher
            </button>
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <SourcesList 
            sources={sources} 
            activeSource={activeSource} 
            onSourceChange={setActiveSource} 
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <button
              onClick={loadNews}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Actualiser
            </button>
          </div>
        </div>
        
        <div className="md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Erreur!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : filteredTweets.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-700 dark:text-gray-300">
                {searchQuery 
                  ? "Aucun résultat trouvé pour votre recherche." 
                  : activeSource 
                    ? `Aucune actualité disponible pour ${activeSource}.` 
                    : "Aucune actualité disponible pour le moment."}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {activeSource ? `Actualités de ${activeSource}` : 'Dernières actualités'}
                {searchQuery && ` - Recherche: "${searchQuery}"`}
              </h2>
              
              <div className="space-y-4">
                {filteredTweets.map(tweet => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
