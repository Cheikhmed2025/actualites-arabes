export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        À propos d'ActualitésArabes
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Notre mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ActualitésArabes a été créé avec une mission claire : permettre aux utilisateurs d'accéder rapidement et facilement à toutes les informations importantes publiées dans le monde arabe.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Dans un monde où l'information est abondante mais le temps limité, notre plateforme agrège les actualités des sources les plus fiables du monde arabe pour vous offrir une vue d'ensemble complète et à jour.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ce que nous offrons</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-400">Agrégation d'actualités de sources arabes fiables</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-400">Recherche et filtrage par source et par catégorie</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-400">Interface bilingue (arabe et français)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-400">Mises à jour en temps réel des dernières informations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-400">Expérience utilisateur optimisée pour gagner du temps</span>
            </li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Nos sources</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Nous agrégeons des informations provenant de diverses sources médiatiques arabes, notamment :
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span className="text-gray-600 dark:text-gray-400">Chaînes d'information (Al Jazeera, Al Arabiya, BBC Arabic, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span className="text-gray-600 dark:text-gray-400">Journaux et magazines (Al-Ahram, Asharq Al-Awsat, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span className="text-gray-600 dark:text-gray-400">Agences de presse officielles des pays arabes</span>
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            <a href="/sources" className="text-blue-600 dark:text-blue-400 hover:underline">Consultez notre liste complète de sources</a>
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contactez-nous</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Vous avez des questions, des suggestions ou des commentaires ? N'hésitez pas à nous contacter.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Nous contacter
          </a>
        </section>
      </div>
    </div>
  );
}
