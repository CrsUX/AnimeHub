import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AnimeCard from './components/AnimeCard';
import AnimePage from './pages/AnimePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import Header from './components/layout/Header';
import Layout from './components/layout/Layout';
import { useAnimeStore } from './store/animeStore';
import { useAuth } from './hooks/useAuth';
import { getPopularAnime, getTrendingAnime, getLatestAnime } from './utils/anilist';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const App = () => {
  const { 
    animeList, 
    currentAnime,
    isLoading, 
    error,
    pageInfo,
    setAnimeList, 
    setCurrentAnime,
    setLoading,
    setError,
    setPageInfo
  } = useAnimeStore();

  const { initialize } = useAuth();
  const [currentView, setCurrentView] = useState('discover');

  useEffect(() => {
    initialize();
  }, []);

  const fetchAnime = async (page: number, view: string, query?: string) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      switch (view) {
        case 'trending':
          result = await getTrendingAnime(page);
          break;
        case 'latest':
          result = await getLatestAnime(page);
          break;
        case 'popular':
          result = await getPopularAnime(page);
          break;
        default:
          result = await getPopularAnime(page);
      }
      
      setAnimeList(result.media);
      setPageInfo(result.pageInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch anime');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime(1, currentView);
  }, [currentView]);

  const renderMainContent = () => {
    if (currentAnime) {
      return <AnimePage />;
    }

    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <Navigation currentView={currentView} onViewChange={setCurrentView} />
            
            {isLoading ? (
              <div className="text-center text-light/70">Loading...</div>
            ) : error ? (
              <div className="text-center text-primary">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {animeList.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onClick={setCurrentAnime}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </>
    );
  };

  return (
    <Router>
      <Layout fetchAnime={fetchAnime}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={renderMainContent()} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;