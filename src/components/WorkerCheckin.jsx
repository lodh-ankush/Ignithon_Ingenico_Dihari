import React, { useState, useEffect } from 'react';

const WorkerCheckin = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [location, setLocation] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [jobAlerts, setJobAlerts] = useState([]);

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
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }

    // Simulate job alerts
    const alerts = [
      {
        id: 1,
        message: '5 मज़दूर चाहिए पाटिया चौक में। ₹500/दिन।',
        location: 'Patia Chowk',
        audioUrl: '#'
      },
      {
        id: 2,
        message: '2 बढ़ई चाहिए खंडगिरि में। कल से काम।',
        location: 'Khandagiri',
        audioUrl: '#'
      }
    ];
    setJobAlerts(alerts);
  }, []);

  const handleCheckin = () => {
    if (selectedSkill && location) {
      setIsCheckedIn(true);
      // In real app, this would send data to Firebase/Supabase
      const checkinData = {
        skill: selectedSkill,
        location: location,
        timestamp: new Date().toISOString(),
        coordinates: currentLocation
      };
      console.log('Worker checked in:', checkinData);
      
      // Store in localStorage for demo
      localStorage.setItem('workerCheckin', JSON.stringify(checkinData));
    }
  };

  const handleCheckout = () => {
    setIsCheckedIn(false);
    localStorage.removeItem('workerCheckin');
  };

  const playAudio = (alert) => {
    // In real app, this would play the TTS generated audio
    const utterance = new SpeechSynthesisUtterance(alert.message);
    utterance.lang = 'hi-IN';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Job Alerts */}
      {jobAlerts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
            🔔 नए काम की जानकारी
          </h3>
          <div className="space-y-3">
            {jobAlerts.map((alert) => (
              <div key={alert.id} className="bg-white p-3 rounded border border-yellow-200">
                <p className="text-sm text-gray-800 mb-2">{alert.message}</p>
                <button
                  onClick={() => playAudio(alert)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs flex items-center space-x-1"
                >
                  <span>🔊</span>
                  <span>सुनें</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Check-in Status */}
      {isCheckedIn ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="text-xl font-semibold text-green-800 mb-2">आप हाज़िर हैं!</h2>
          <p className="text-green-700 mb-4">
            {skills.find(s => s.id === selectedSkill)?.hindi} - {location}
          </p>
          <button
            onClick={handleCheckout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            📤 छुट्टी करें
          </button>
        </div>
      ) : (
        <>
          {/* Skill Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">अपना काम चुनें</h2>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedSkill === skill.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <div className="text-sm font-medium text-gray-800">{skill.hindi}</div>
                  <div className="text-xs text-gray-500">{skill.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">जगह चुनें</h2>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">अपनी जगह चुनें</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Check-in Button */}
          <button
            onClick={handleCheckin}
            disabled={!selectedSkill || !location}
            className={`w-full py-4 rounded-lg font-semibold text-lg ${
              selectedSkill && location
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            📋 हाज़िरी लगाएं
          </button>
        </>
      )}
    </div>
  );
};

export default WorkerCheckin;