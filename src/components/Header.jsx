import React from 'react';

const Header = ({ userType, onReset, currentView, setCurrentView }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏗️</div>
            <h1 className="text-xl font-semibold text-gray-800">Labour Haat</h1>
          </div>
          
          {userType && (
            <div className="flex items-center space-x-4">
              {userType === 'contractor' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'dashboard'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    📊 Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentView('broadcast')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'broadcast'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    📢 Broadcast Job
                  </button>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <span className="text-2xl">
                  {userType === 'worker' ? '👷' : '👔'}
                </span>
                <span className="text-sm text-gray-600 capitalize">{userType}</span>
              </div>
              
              <button
                onClick={onReset}
                className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 px-3 py-1 rounded"
              >
                Switch Role
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;