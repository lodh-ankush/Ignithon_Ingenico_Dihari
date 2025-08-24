import React, { useState } from 'react';
import Header from './components/Header';
import WorkerCheckin from './components/WorkerCheckin';
import ContractorDashboard from './components/ContractorDashboard';
import JobBroadcast from './components/JobBroadcast';

function App() {
  const [userType, setUserType] = useState(null); // 'worker' or 'contractor'
  const [currentView, setCurrentView] = useState('main');

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setCurrentView(type === 'worker' ? 'checkin' : 'dashboard');
  };

  const resetApp = () => {
    setUserType(null);
    setCurrentView('main');
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🏗️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Labour Haat</h1>
            <p className="text-gray-600">Digital Muster System</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => handleUserTypeSelection('worker')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-colors"
            >
              <span className="text-2xl">👷</span>
              <span>I am a Worker</span>
            </button>
            
            <button
              onClick={() => handleUserTypeSelection('contractor')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-colors"
            >
              <span className="text-2xl">👔</span>
              <span>I am a Contractor</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userType={userType} onReset={resetApp} currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1">
        {userType === 'worker' && currentView === 'checkin' && <WorkerCheckin />}
        {userType === 'contractor' && currentView === 'dashboard' && <ContractorDashboard />}
        {userType === 'contractor' && currentView === 'broadcast' && <JobBroadcast />}
      </main>
    </div>
  );
}

export default App;