import React, { useState } from 'react';
import TrackingModal from './TrackingModal';

const TrackingDock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="tracking-dock">
        {/* Web Tracking Button */}
        <button 
          className="dock-item web-track" 
          onClick={() => setIsModalOpen(true)}
          title="Web Tracking"
        >
          <span className="dock-tooltip">Web Tracking</span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        {/* Telegram Tracking Button */}
        <a 
          href="https://t.me/rexplorebot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="dock-item telegram-track" 
          title="Telegram Tracking"
        >
          <div className="telegram-pulse"></div>
          <i className="fab fa-telegram-plane"></i>
          <span className="dock-tooltip">Telegram Bot</span>
          <span className="dock-badge">NEW 🤖</span>
        </a>
      </div>

      <TrackingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default TrackingDock;
