import React from 'react';
import Header from '../components/Header';
import SidebarMenu from '../components/SidebarMenu';
import Dashboard from './dashboard';

// Main layout component for the authenticated app view
// Includes a header, sidebar, and main content area
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0E0D0D] text-white">
      {/* Top navigation bar */}
      <header className="h-10 sm:h-20">
        <Header />
      </header>

      {/* Main content layout: sidebar + page content */}
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Vertical sidebar navigation */}
        <nav className="w-7 sm:w-20">
          <SidebarMenu />
        </nav>

        {/* Main dashboard area */}
        <main className="w-[calc(100vw-1.75rem)] sm:w-[calc(100vw-5rem)] overflow-x-hidden">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
