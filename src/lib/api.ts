// Simulation des données d'API pour les tests locaux
// Ce fichier remplace l'accès direct aux API Twitter

// Simuler des tweets pour les tests
const mockTweets = [
  {
    id: '1',
    text: 'الرئيس المصري يلتقي نظيره السعودي لمناقشة العلاقات الثنائية والقضايا الإقليمية. #السياسة #مصر #السعودية',
    created_at: '2025-03-22T10:30:00Z',
    user: {
      name: 'Al Jazeera Arabic',
      screen_name: 'AJArabic',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '2',
    text: 'ارتفاع أسعار النفط بنسبة 2% بعد اجتماع أوبك. تحليل للتأثيرات المحتملة على اقتصادات الدول العربية. #اقتصاد #نفط #أوبك',
    created_at: '2025-03-22T09:45:00Z',
    user: {
      name: 'Al Arabiya',
      screen_name: 'AlArabiya',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '3',
    text: 'افتتاح معرض الكتاب الدولي في أبو ظبي بمشاركة أكثر من 500 دار نشر عربية وعالمية. #ثقافة #كتب #الإمارات',
    created_at: '2025-03-22T08:15:00Z',
    user: {
      name: 'BBC Arabic',
      screen_name: 'BBCArabic',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '4',
    text: 'منتخب المغرب يتأهل إلى نهائيات كأس أفريقيا بعد فوزه على منتخب تونس. #رياضة #كرة_القدم #المغرب',
    created_at: '2025-03-22T07:30:00Z',
    user: {
      name: 'Sky News Arabia',
      screen_name: 'skynewsarabia',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '5',
    text: 'إطلاق مبادرة جديدة للحفاظ على البيئة في الأردن بالتعاون مع الأمم المتحدة. #بيئة #الأردن #تغير_المناخ',
    created_at: '2025-03-22T06:45:00Z',
    user: {
      name: 'France24 Arabic',
      screen_name: 'France24_ar',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '6',
    text: 'تقرير: تزايد استخدام التكنولوجيا الرقمية في قطاع التعليم بالدول العربية خلال السنوات الأخيرة. #تعليم #تكنولوجيا #العالم_العربي',
    created_at: '2025-03-22T05:30:00Z',
    user: {
      name: 'RT Arabic',
      screen_name: 'RTarabic',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '7',
    text: 'وزراء الصحة العرب يجتمعون لمناقشة استراتيجية موحدة لمواجهة التحديات الصحية في المنطقة. #صحة #وزراء_الصحة #تعاون_عربي',
    created_at: '2025-03-22T04:15:00Z',
    user: {
      name: 'CNN Arabic',
      screen_name: 'cnnarabic',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '8',
    text: 'مصر تعلن عن خطة خمسية جديدة للتنمية الاقتصادية والاجتماعية. تفاصيل المشاريع والاستثمارات المتوقعة. #مصر #اقتصاد #تنمية',
    created_at: '2025-03-22T03:30:00Z',
    user: {
      name: 'Al-Ahram',
      screen_name: 'AlAhram',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '9',
    text: 'قمة عربية مرتقبة في الرياض الشهر المقبل لمناقشة القضايا الإقليمية والتحديات المشتركة. #قمة_عربية #الرياض #السعودية',
    created_at: '2025-03-22T02:45:00Z',
    user: {
      name: 'Asharq Al-Awsat',
      screen_name: 'aawsat_News',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  },
  {
    id: '10',
    text: 'افتتاح متحف الفن العربي المعاصر في الدوحة بمعرض يضم أعمالاً لأكثر من 100 فنان عربي. #فن #ثقافة #قطر',
    created_at: '2025-03-22T01:30:00Z',
    user: {
      name: 'Al-Hayat',
      screen_name: 'alhayatdaily',
      profile_image_url: 'https://via.placeholder.com/50'
    }
  }
];

// Liste des sources d'actualités arabes importantes (chaînes et médias)
export const arabicNewsSources = [
  { name: 'Al Jazeera', username: 'AJArabic', category: 'news' },
  { name: 'Al Arabiya', username: 'AlArabiya', category: 'news' },
  { name: 'BBC Arabic', username: 'BBCArabic', category: 'news' },
  { name: 'Sky News Arabia', username: 'skynewsarabia', category: 'news' },
  { name: 'France24 Arabic', username: 'France24_ar', category: 'news' },
  { name: 'RT Arabic', username: 'RTarabic', category: 'news' },
  { name: 'CNN Arabic', username: 'cnnarabic', category: 'news' },
  { name: 'Al-Ahram', username: 'AlAhram', category: 'newspaper' },
  { name: 'Asharq Al-Awsat', username: 'aawsat_News', category: 'newspaper' },
  { name: 'Al-Hayat', username: 'alhayatdaily', category: 'newspaper' }
];

// Fonction pour simuler la recherche de tweets en arabe
export async function searchArabicTweets(query, count = 20) {
  // Filtrer les tweets qui contiennent le mot-clé de recherche
  const filteredTweets = mockTweets.filter(tweet => 
    tweet.text.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    result: {
      timeline: {
        instructions: [
          {
            entries: filteredTweets.map(tweet => ({
              content: {
                itemContent: {
                  tweet_results: {
                    result: {
                      rest_id: tweet.id,
                      legacy: {
                        full_text: tweet.text,
                        created_at: tweet.created_at
                      },
                      core: {
                        user_results: {
                          result: {
                            legacy: {
                              name: tweet.user.name,
                              screen_name: tweet.user.screen_name,
                              profile_image_url_https: tweet.user.profile_image_url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }))
          }
        ]
      }
    }
  };
}

// Fonction pour simuler l'obtention du profil d'un utilisateur Twitter
export async function getUserProfile(username) {
  const source = arabicNewsSources.find(source => source.username === username);
  
  if (!source) {
    return { error: `Utilisateur ${username} non trouvé` };
  }
  
  return {
    result: {
      data: {
        user: {
          result: {
            rest_id: `user_${username}`,
            legacy: {
              name: source.name,
              screen_name: username,
              profile_image_url_https: 'https://via.placeholder.com/50'
            }
          }
        }
      }
    }
  };
}

// Fonction pour simuler l'obtention des tweets d'un utilisateur spécifique
export async function getUserTweets(userId, count = 20) {
  // Extraire le nom d'utilisateur du userId (format: user_username)
  const username = userId.replace('user_', '');
  
  // Filtrer les tweets par nom d'utilisateur
  const userTweets = mockTweets.filter(tweet => 
    tweet.user.screen_name === username
  );
  
  return {
    result: {
      timeline: {
        instructions: [
          {
            entries: userTweets.map(tweet => ({
              content: {
                itemContent: {
                  tweet_results: {
                    result: {
                      rest_id: tweet.id,
                      legacy: {
                        full_text: tweet.text,
                        created_at: tweet.created_at
                      },
                      core: {
                        user_results: {
                          result: {
                            legacy: {
                              name: tweet.user.name,
                              screen_name: tweet.user.screen_name,
                              profile_image_url_https: tweet.user.profile_image_url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }))
          }
        ]
      }
    }
  };
}

// Fonction pour récupérer les actualités de toutes les sources arabes
export async function fetchAllArabicNews() {
  const results = [];
  
  for (const source of arabicNewsSources) {
    try {
      // Simuler l'obtention du profil
      const profileResponse = await getUserProfile(source.username);
      
      if (profileResponse.error) {
        results.push({
          source: source.name,
          error: profileResponse.error
        });
        continue;
      }
      
      // Extraire l'ID utilisateur du profil
      const userId = profileResponse.result?.data?.user?.result?.rest_id;
      
      if (!userId) {
        results.push({
          source: source.name,
          error: "Impossible d'extraire l'ID utilisateur"
        });
        continue;
      }
      
      // Récupérer les tweets de cet utilisateur
      const tweetsResponse = await getUserTweets(userId, 10);
      
      if (tweetsResponse.error) {
        results.push({
          source: source.name,
          error: tweetsResponse.error
        });
        continue;
      }
      
      results.push({
        source: source.name,
        profile: profileResponse,
        tweets: tweetsResponse,
        category: source.category
      });
      
    } catch (error) {
      results.push({
        source: source.name,
        error: `Erreur inattendue: ${error.message || 'Inconnue'}`
      });
    }
  }
  
  return results;
}

// Fonction pour rechercher des actualités par mot-clé
export async function searchNewsByKeyword(keyword) {
  return await searchArabicTweets(keyword, 30);
}
