import { fetchAllArabicNews, searchNewsByKeyword } from '../lib/api';

// Type pour les tweets
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

// Type pour les résultats d'actualités
type NewsResult = {
  source: string;
  profile?: any;
  tweets?: any;
  category?: string;
  error?: string;
};

// Fonction pour extraire les tweets des résultats de l'API
function extractTweets(newsResults: NewsResult[]): Tweet[] {
  const tweets: Tweet[] = [];
  
  newsResults.forEach(result => {
    if (result.tweets && !result.error) {
      // Extraire les tweets de la structure de réponse de l'API
      const entries = result.tweets.result?.timeline?.instructions?.[0]?.entries || [];
      
      entries.forEach(entry => {
        if (entry.content?.itemContent?.tweet_results?.result) {
          const tweetData = entry.content.itemContent.tweet_results.result;
          const userData = tweetData.core?.user_results?.result;
          
          if (tweetData && userData) {
            tweets.push({
              id: tweetData.rest_id,
              text: tweetData.legacy?.full_text || '',
              created_at: tweetData.legacy?.created_at || '',
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

// Fonction pour récupérer les actualités arabes
export async function getArabicNews() {
  try {
    const newsResults = await fetchAllArabicNews();
    const tweets = extractTweets(newsResults);
    
    // Trier les tweets par date (les plus récents d'abord)
    tweets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return {
      tweets,
      sources: newsResults.map(result => ({
        name: result.source,
        category: result.category,
        hasError: !!result.error
      }))
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités arabes:', error);
    return { tweets: [], sources: [], error: 'Impossible de récupérer les actualités' };
  }
}

// Fonction pour rechercher des actualités par mot-clé
export async function searchNews(keyword: string) {
  try {
    const searchResults = await searchNewsByKeyword(keyword);
    
    // Extraire les tweets des résultats de recherche
    const tweets: Tweet[] = [];
    
    const entries = searchResults.result?.timeline?.instructions?.[0]?.entries || [];
    
    entries.forEach(entry => {
      if (entry.content?.itemContent?.tweet_results?.result) {
        const tweetData = entry.content.itemContent.tweet_results.result;
        const userData = tweetData.core?.user_results?.result;
        
        if (tweetData && userData) {
          tweets.push({
            id: tweetData.rest_id,
            text: tweetData.legacy?.full_text || '',
            created_at: tweetData.legacy?.created_at || '',
            user: {
              name: userData.legacy?.name || '',
              screen_name: userData.legacy?.screen_name || '',
              profile_image_url: userData.legacy?.profile_image_url_https || ''
            }
          });
        }
      }
    });
    
    return { tweets };
  } catch (error) {
    console.error(`Erreur lors de la recherche d'actualités pour "${keyword}":`, error);
    return { tweets: [], error: 'Impossible de rechercher des actualités' };
  }
}
