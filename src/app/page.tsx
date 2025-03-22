import NewsComponent from '../components/NewsComponent';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Bienvenue sur ActualitésArabes
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Votre portail d'information pour suivre toutes les actualités importantes du monde arabe en un seul endroit.
        </p>
      </div>
      
      <NewsComponent />
    </div>
  );
}
