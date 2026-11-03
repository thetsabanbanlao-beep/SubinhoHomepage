import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PageViewer } from './components/PageViewer';
import { SlidePresentationModal } from './components/SlidePresentationModal';
import { TeacherProfileModal } from './components/TeacherProfileModal';
import { BackofficeModal } from './components/BackofficeModal';
import { Footer } from './components/Footer';
import { PortalData, WebPage } from './types/portal';
import { loadPortalData, savePortalData, pullDataFromGas } from './utils/storage';

export default function App() {
  const [data, setData] = useState<PortalData>(() => loadPortalData());
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [presentationPage, setPresentationPage] = useState<WebPage | null>(null);

  // Auto-fetch latest from GAS on boot if configured
  useEffect(() => {
    if (data.gasConfig.webAppUrl && data.gasConfig.autoSync) {
      pullDataFromGas(data.gasConfig.webAppUrl).then((res) => {
        if (res.success && res.data) {
          setData(res.data);
          savePortalData(res.data);
        }
      });
    }
  }, []);

  // Update handler
  const handleSaveData = (newData: PortalData) => {
    setData(newData);
    savePortalData(newData);
  };

  // Select page
  const handleSelectPage = (pageId: string | null) => {
    setActivePageId(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active page object
  const activePage = activePageId
    ? data.pages.find((p) => p.id === activePageId) || null
    : null;

  const gasConnected = !!(data.gasConfig.webAppUrl && data.gasConfig.webAppUrl.length > 10);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        profile={data.profile}
        pages={data.pages}
        activePageId={activePageId}
        onSelectPage={handleSelectPage}
        onOpenAdmin={() => setShowAdminModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        gasConnected={gasConnected}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activePage ? (
          /* Single WebPage / Lesson Viewer */
          <PageViewer
            page={activePage}
            allPages={data.pages}
            onBack={() => handleSelectPage(null)}
            onSelectPage={handleSelectPage}
            onOpenPresentation={(p) => setPresentationPage(p)}
          />
        ) : (
          /* Homepage View */
          <>
            {/* Hero Banner with Kru Subin's profile & badges */}
            <HeroSection
              profile={data.profile}
              featuredPages={data.pages.filter((p) => p.featured)}
              onSelectPage={handleSelectPage}
              onOpenAdmin={() => setShowAdminModal(true)}
              onOpenProfile={() => setShowProfileModal(true)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        profile={data.profile}
        pages={data.pages}
        onSelectPage={handleSelectPage}
        onOpenAdmin={() => setShowAdminModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        gasConnected={gasConnected}
      />

      {/* Backoffice CMS Modal */}
      {showAdminModal && (
        <BackofficeModal
          data={data}
          onSave={handleSaveData}
          onClose={() => setShowAdminModal(false)}
        />
      )}

      {/* Teacher Profile / CV Modal */}
      {showProfileModal && (
        <TeacherProfileModal
          profile={data.profile}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Fullscreen Slide Presentation Modal */}
      {presentationPage && (
        <SlidePresentationModal
          page={presentationPage}
          onClose={() => setPresentationPage(null)}
        />
      )}
    </div>
  );
}
