// Ce fichier implémente les fonctionnalités d'agrégation par catégorie

import { NextResponse } from 'next/server';
import { searchNewsByKeyword } from '../../../../lib/api';

// Fonction pour extraire les tweets des résultats de recherche
function extractSearchTweets(searchResults) {
  const tweets = [];
  
  const entries = searchResults.result?.timeline?.instructions?.[0]?.entries || [];
  
  entries.forEach(entry => {
    if (entry.content?.itemContent?.tweet_results?.result) {
      const tweetData = entry.content.itemContent.tweet_results.result;
      const userData = tweetData.core?.user_results?.result;
      
      if (tweetData && userData) {
        tweets.push({
          id: tweetData.rest_id || `${Date.now()}-${Math.random()}`,
          text: tweetData.legacy?.full_text || '',
          created_at: tweetData.legacy?.created_at || new Date().toISOString(),
          user: {
            name: userData.legacy?.name || '',
            screen_name: userData.legacy?.screen_name || '',
            profile_image_url: userData.legacy?.profile_image_url_https || ''
          }
        });
      }
    }
  });
  
  return tweets;
}

// Mapping des catégories vers des mots-clés de recherche en arabe
const categoryKeywords = {
  'politique': 'سياسة الشرق الأوسط',
  'economie': 'اقتصاد عربي',
  'societe': 'مجتمع عربي',
  'sport': 'رياضة عربية',
  'technologie': 'تكنولوجيا العرب',
  'culture': 'ثقافة عربية',
  'sante': 'صحة الشرق الأوسط',
  'environnement': 'بيئة الشرق الأوسط',
  'education': 'تعليم عربي'
};

export async function GET(request, { params }) {
  try {
    const categoryId = params.categoryId;
    
    // Vérifier si la catégorie existe
    if (!categoryKeywords[categoryId]) {
      return NextResponse.json(
        { error: 'Catégorie non trouvée' },
        { status: 404 }
      );
    }
    
    // Récupérer le mot-clé de recherche pour cette catégorie
    const keyword = categoryKeywords[categoryId];
    
    // Effectuer la recherche
    const searchResults = await searchNewsByKeyword(keyword);
    const tweets = extractSearchTweets(searchResults);
    
    return NextResponse.json({ 
      tweets,
      category: categoryId,
      keyword
    });
  } catch (error) {
    console.error(`Erreur lors de la récupération des actualités pour la catégorie ${params.categoryId}:`, error);
    return NextResponse.json(
      { error: 'Impossible de récupérer les actualités pour cette catégorie' },
      { status: 500 }
    );
  }
}
