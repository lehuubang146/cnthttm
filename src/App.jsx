import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './App.css';
import LineSidebar from './components/LineSidebar';
import Home from './pages/Home';
import SolutionDe1 from './pages/SolutionDe1';
import SolutionDe2 from './pages/SolutionDe2';
import MockExam from './pages/MockExam';

function App() {
  const [activeItem, setActiveItem] = useState('Trang chủ');
  // Auto-close sidebar on mobile by default, open on desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  
  const sidebarItems = ['Trang chủ', 'Giải Bài Đề 1', 'Giải Bài Đề 2', 'Thi Thử (Mock Exam)'];

  // Handle resize to show/hide sidebar automatically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarClick = (index, label) => {
    setActiveItem(label);
    // Close sidebar on mobile after clicking a link
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'Trang chủ':
        return <Home navigate={setActiveItem} />;
      case 'Giải Bài Đề 1':
        return <SolutionDe1 />;
      case 'Giải Bài Đề 2':
        return <SolutionDe2 />;
      case 'Thi Thử (Mock Exam)':
        return <MockExam />;
      default:
        return <Home navigate={setActiveItem} />;
    }
  };

  const defaultActiveIndex = sidebarItems.indexOf(activeItem);

  return (
    <div className="app-container">

      {/* Mobile/Toggle Button */}
      {!isSidebarOpen && (
        <button 
          className="menu-toggle-btn" 
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Mở menu"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen && window.innerWidth <= 768 ? 'show' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar Navigation */}
      <aside className={`sidebar-wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">CNTHTTM</h1>
          {/* Always show close button inside sidebar so user can collapse it manually if they want */}
          <button 
            className="close-sidebar-btn"
            onClick={() => setIsSidebarOpen(false)} 
            aria-label="Đóng menu"
          >
            <X size={24} />
          </button>
        </div>
        <div style={{ marginTop: '1rem', flex: 1 }}>
          <LineSidebar
            items={sidebarItems}
            defaultActive={defaultActiveIndex >= 0 ? defaultActiveIndex : 0}
            onItemClick={handleSidebarClick}
            accentColor="#2563eb" // premium dark blue
            textColor="#374151"   // gray-700
            markerColor="#e5e7eb" // gray-200
            fontSize={1.15}
            itemGap={24}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="content-wrapper">
        <div className="content-card">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
