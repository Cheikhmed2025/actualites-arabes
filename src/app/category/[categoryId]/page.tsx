'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Types pour les tweets
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

// Mapping des catégories vers leurs noms en français
const categoryNames = {
  'politique': 'Politique',
  'economie': 'Économie',
  'societe': 'Société',
  'sport': 'Sport',
  'technologie': 'Technologie',
  'culture': 'Culture',
  'sante': 'Santé',
  'environnement': 'Environnement',
  'education': 'Éducation'
};

// Composant pour la page de catégorie
export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');

  // Fonction pour charger les actualités de la catégorie
  const loadCategoryNews = async () => {
    setLoading(true);
    try {
      // Appel à l'API de catégorie
      const response = await fetch(`/api/category/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setTweets(data.tweets || []);
        setKeyword(data.keyword || '');
        setError(null);
      }
    } catch (err) {
      setError('Impossible de charger les actualités pour cette catégorie. Veuillez réessayer plus tard.');
      console.error('Erreur lors du chargement des actualités de catégorie:', err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les actualités au chargement du composant
  useEffect(() => {
    loadCategoryNews();
  }, [categoryId]);

  // Obtenir le nom de la catégorie
  const categoryName = categoryNames[categoryId] || categoryId;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Actualités : {categoryName}
      </h1>
      
      {keyword && (
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Mot-clé de recherche : <span className="font-semibold" dir="rtl">{keyword}</span>
        </p>
      )}
      
      <div className="mb-6">
        <button
          onClick={loadCategoryNews}
          className="mx-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : tweets.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Aucune actualité disponible pour cette catégorie pour le moment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tweets.map(tweet => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
    </div>
  );
}
