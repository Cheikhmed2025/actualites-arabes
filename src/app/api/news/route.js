// Ce fichier sert de point d'entrée pour les API routes de Next.js
// Il implémente les fonctionnalités d'agrégation d'actualités

import { NextRequest, NextResponse } from 'next/server';
import { fetchAllArabicNews, searchNewsByKeyword } from '../../../lib/api';

// Fonction pour extraire les tweets des résultats de l'API
function extractTweets(newsResults) {
  const tweets = [];
  
  newsResults.forEach(result => {
    if (result.tweets && !result.error) {
      // Extraire les tweets de la structure de réponse de l'API
      const entries = result.tweets.result?.timeline?.instructions?.[0]?.entries || [];
      
      entries.forEach(entry => {
        if (entry.content?.itemContent?.tweet_results?.result) {
          const tweetData = entry.content.itemContent.tweet_results.result;
          const userData = tweetData.core?.user_results?.result || 
                          (tweetData.legacy && { legacy: { 
                            name: result.source, 
                            screen_name: result.source.toLowerCase().replace(/\s/g, ''),
                            profile_image_url_https: '' 
                          }});
          
          if (tweetData && userData) {
            tweets.push({
              id: tweetData.rest_id || `${Date.now()}-${Math.random()}`,
              text: tweetData.legacy?.full_text || '',
              created_at: tweetData.legacy?.created_at || new Date().toISOString(),
              user: {
                name: userData.legacy?.name || result.source,
                screen_name: userData.legacy?.screen_name || '',
                profile_image_url: userData.legacy?.profile_image_url_https || ''
              }
            });
          }
        }
      });
    }
  });
  
  return tweets;
}

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

export async function GET(request) {
  try {
    // Récupérer les paramètres de requête
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    
    if (keyword) {
      // Si un mot-clé est fourni, effectuer une recherche
      const searchResults = await searchNewsByKeyword(keyword);
      const tweets = extractSearchTweets(searchResults);
      
      return NextResponse.json({ 
        tweets,
        sources: [],
        query: keyword
      });
    } else {
      // Sinon, récupérer toutes les actualités
      const newsResults = await fetchAllArabicNews();
      const tweets = extractTweets(newsResults);
      
      // Trier les tweets par date (les plus récents d'abord)
      tweets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      return NextResponse.json({
        tweets,
        sources: newsResults.map(result => ({
          name: result.source,
          category: result.category,
          hasError: !!result.error
        }))
      });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    return NextResponse.json(
      { error: 'Impossible de récupérer les actualités' },
      { status: 500 }
    );
  }
}
