import React, { useState, useEffect } from 'react';

const ContractorDashboard = () => {
  const [workersData, setWorkersData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');

  const skills = [
    { id: 'mason', name: 'Mason', icon: '🧱', hindi: 'राजमिस्त्री' },
    { id: 'carpenter', name: 'Carpenter', icon: '🔨', hindi: 'बढ़ई' },
    { id: 'painter', name: 'Painter', icon: '🎨', hindi: 'पेंटर' },
    { id: 'plumber', name: 'Plumber', icon: '🔧', hindi: 'नलसाज़' },
    { id: 'electrician', name: 'Electrician', icon: '⚡', hindi: 'बिजली का काम' },
    { id: 'helper', name: 'Helper', icon: '💪', hindi: 'मज़दूर' },
    { id: 'welder', name: 'Welder', icon: '🔥', hindi: 'वेल्डर' },
    { id: 'driver', name: 'Driver', icon: '🚛', hindi: 'ड्राइवर' }
  ];

  const locations = [
    'Patia Chowk', 'Khandagiri Square', 'Master Canteen Square', 
    'Raghunathpur', 'Jaydev Vihar', 'Saheed Nagar', 'Unit 1 Market',
    'CRP Square', 'Baramunda Bus Stand', 'Kalinga Hospital Square'
  ];

  useEffect(() => {
    // Load mock data + any real check-ins from localStorage
    const mockWorkers = [
      { id: 1, skill: 'mason', location: 'Patia Chowk', count: 12, available: true },
      { id: 2, skill: 'carpenter', location: 'Patia Chowk', count: 8, available: true },
      { id: 3, skill: 'helper', location: 'Patia Chowk', count: 25, available: true },
      { id: 4, skill: 'mason', location: 'Khandagiri Square', count: 6, available: true },
      { id: 5, skill: 'painter', location: 'Khandagiri Square', count: 4, available: true },
      { id: 6, skill: 'electrician', location: 'Master Canteen Square', count: 3, available: true },
      { id: 7, skill: 'plumber', location: 'Jaydev Vihar', count: 5, available: true },
      { id: 8, skill: 'driver', location: 'Baramunda Bus Stand', count: 15, available: true },
      { id: 9, skill: 'welder', location: 'Saheed Nagar', count: 2, available: true }
    ];

    // Add real check-in if exists
    const realCheckin = localStorage.getItem('workerCheckin');
    if (realCheckin) {
      const checkinData = JSON.parse(realCheckin);
      const existingIndex = mockWorkers.findIndex(
        w => w.skill === checkinData.skill && w.location === checkinData.location
      );
      
      if (existingIndex >= 0) {
        mockWorkers[existingIndex].count += 1;
      } else {
        mockWorkers.push({
          id: Date.now(),
          skill: checkinData.skill,
          location: checkinData.location,
          count: 1,
          available: true,
          isReal: true
        });
      }
    }

    setWorkersData(mockWorkers);
  }, []);

  const filteredWorkers = workersData.filter(worker => {
    return (selectedLocation === 'all' || worker.location === selectedLocation) &&
           (selectedSkill === 'all' || worker.skill === selectedSkill);
  });

  const getSkillInfo = (skillId) => {
    return skills.find(s => s.id === skillId) || { icon: '👷', hindi: skillId };
  };

  const getTotalWorkersByLocation = () => {
    const locationSummary = {};
    workersData.forEach(worker => {
      if (!locationSummary[worker.location]) {
        locationSummary[worker.location] = 0;
      }
      locationSummary[worker.location] += worker.count;
    });
    return locationSummary;
  };

  const getTotalWorkersBySkill = () => {
    const skillSummary = {};
    workersData.forEach(worker => {
      if (!skillSummary[worker.skill]) {
        skillSummary[worker.skill] = 0;
      }
      skillSummary[worker.skill] += worker.count;
    });
    return skillSummary;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="text-3xl mb-2">👷‍♂️</div>
          <div className="text-2xl font-bold text-blue-600">
            {workersData.reduce((sum, w) => sum + w.count, 0)}
          </div>
          <div className="text-gray-600">Total Available Workers</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="text-3xl mb-2">📍</div>
          <div className="text-2xl font-bold text-green-600">
            {Object.keys(getTotalWorkersByLocation()).length}
          </div>
          <div className="text-gray-600">Active Locations</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="text-3xl mb-2">🔧</div>
          <div className="text-2xl font-bold text-purple-600">
            {Object.keys(getTotalWorkersBySkill()).length}
          </div>
          <div className="text-gray-600">Available Skills</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Skill</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Skills</option>
              {skills.map(skill => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkers.map((worker) => {
          const skillInfo = getSkillInfo(worker.skill);
          return (
            <div key={worker.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{skillInfo.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{skillInfo.hindi}</div>
                    <div className="text-sm text-gray-500">{skillInfo.name}</div>
                  </div>
                </div>
                {worker.isReal && (
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    LIVE
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">📍 {worker.location}</div>
                <div className="text-2xl font-bold text-blue-600">{worker.count} Available</div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  📞 Contact
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  📢 Broadcast
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-lg text-gray-600">No workers found matching your filters</div>
          <div className="text-sm text-gray-500 mt-2">Try adjusting your location or skill filters</div>
        </div>
      )}
    </div>
  );
};

export default ContractorDashboard;