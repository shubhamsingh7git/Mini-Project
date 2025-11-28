import React from 'react';

function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button 
        className={`tab ${activeTab === 'students' ? 'active' : ''}`}
        onClick={() => setActiveTab('students')}
      >
        Students
      </button>
      <button 
        className={`tab ${activeTab === 'sections' ? 'active' : ''}`}
        onClick={() => setActiveTab('sections')}
      >
        Sections
      </button>
      <button 
        className={`tab ${activeTab === 'results' ? 'active' : ''}`}
        onClick={() => setActiveTab('results')}
      >
        Results
      </button>
    </div>
  );
}

export default TabNavigation;