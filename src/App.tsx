import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DemoProvider } from './context/DemoContext';
import { BannerSynthetic } from './components/layout/BannerSynthetic';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DemoBannerFloating } from './components/common/DemoBannerFloating';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { DashboardPage } from './pages/DashboardPage';
import { ThreatActorsPage } from './pages/ThreatActorsPage';
import { ActorProfilePage } from './pages/ActorProfilePage';
import { RelationshipGraphPage } from './pages/RelationshipGraphPage';
import { TimelinePage } from './pages/TimelinePage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { AIAnalysisPage } from './pages/AIAnalysisPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { InvestigationWorkspacePage } from './pages/InvestigationWorkspacePage';
import { ReportsPage } from './pages/ReportsPage';
import { DataImportPage } from './pages/DataImportPage';
import { DemoWalkthroughPage } from './pages/DemoWalkthroughPage';
import { ApiDocsPage } from './pages/ApiDocsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/dashboard');
  const [selectedActorId, setSelectedActorId] = useState<string>('ACTOR-DEMO-001');

  // Handle URL hash or internal path changes
  const navigate = (path: string) => {
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectActor = (actorId: string) => {
    setSelectedActorId(actorId);
  };

  const renderCurrentPage = () => {
    if (currentRoute === '/' || currentRoute === '/landing') {
      return <LandingPage onNavigate={navigate} />;
    }
    if (currentRoute === '/how-it-works') {
      return <HowItWorksPage onNavigate={navigate} />;
    }
    if (currentRoute === '/dashboard') {
      return <DashboardPage onNavigate={navigate} onSelectActor={handleSelectActor} />;
    }
    if (currentRoute === '/actors') {
      return <ThreatActorsPage onNavigate={navigate} onSelectActor={handleSelectActor} />;
    }
    if (currentRoute.startsWith('/actors/')) {
      const idFromRoute = currentRoute.replace('/actors/', '');
      return <ActorProfilePage actorId={idFromRoute || selectedActorId} onNavigate={navigate} />;
    }
    if (currentRoute.startsWith('/graph')) {
      return <RelationshipGraphPage initialFocusActorId={selectedActorId} onNavigate={navigate} onSelectActor={handleSelectActor} />;
    }
    if (currentRoute.startsWith('/timeline')) {
      return <TimelinePage initialActorId={selectedActorId} onNavigate={navigate} onSelectActor={handleSelectActor} />;
    }
    if (currentRoute === '/infrastructure') {
      return <InfrastructurePage onNavigate={navigate} onSelectActor={handleSelectActor} />;
    }
    if (currentRoute.startsWith('/ai-analysis')) {
      return <AIAnalysisPage initialActorA={selectedActorId} initialActorB="ACTOR-DEMO-002" onNavigate={navigate} onSelectActor={handleSelectActor} />;
    }
    if (currentRoute === '/sources') {
      return <DataSourcesPage />;
    }
    if (currentRoute === '/investigation') {
      return <InvestigationWorkspacePage onNavigate={navigate} onSelectActor={handleSelectActor} />;
    }
    if (currentRoute.startsWith('/reports')) {
      const idFromRoute = currentRoute.replace('/reports/', '');
      return <ReportsPage initialActorId={idFromRoute !== '/reports' && idFromRoute ? idFromRoute : selectedActorId} onNavigate={navigate} />;
    }
    if (currentRoute === '/import') {
      return <DataImportPage />;
    }
    if (currentRoute === '/demo') {
      return <DemoWalkthroughPage onNavigate={navigate} />;
    }
    if (currentRoute === '/api-docs') {
      return <ApiDocsPage />;
    }
    if (currentRoute === '/settings') {
      return <SettingsPage />;
    }

    return <DashboardPage onNavigate={navigate} onSelectActor={handleSelectActor} />;
  };

  return (
    <AuthProvider>
      <DemoProvider onNavigate={navigate}>
        <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
          <BannerSynthetic />
          <Navbar currentRoute={currentRoute} onNavigate={navigate} />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {renderCurrentPage()}
          </main>

          <Footer onNavigate={navigate} />
          <DemoBannerFloating onNavigate={navigate} />
        </div>
      </DemoProvider>
    </AuthProvider>
  );
}
