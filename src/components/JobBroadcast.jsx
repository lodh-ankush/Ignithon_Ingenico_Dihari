import React, { useState } from 'react';

const JobBroadcast = () => {
  const [jobDetails, setJobDetails] = useState({
    skill: '',
    count: '',
    location: '',
    wage: '',
    duration: '',
    description: ''
  });
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedMessage, setRecordedMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

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

  const handleInputChange = (field, value) => {
    setJobDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateMessage = () => {
    const skillInfo = skills.find(s => s.id === jobDetails.skill);
    if (!skillInfo) return '';

    if (selectedLanguage === 'hindi') {
      return `${jobDetails.count} ${skillInfo.hindi} चाहिए ${jobDetails.location} में। ₹${jobDetails.wage}/दिन। ${jobDetails.duration}। ${jobDetails.description}`;
    } else {
      return `Need ${jobDetails.count} ${skillInfo.name} at ${jobDetails.location}. ₹${jobDetails.wage}/day. ${jobDetails.duration}. ${jobDetails.description}`;
    }
  };

  const handleTextToSpeech = () => {
    const message = generateMessage();
    if (message) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = selectedLanguage === 'hindi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In real app, implement actual voice recording
    setTimeout(() => {
      setIsRecording(false);
      setRecordedMessage('Recorded voice message (demo)');
    }, 3000);
  };

  const sendBroadcast = () => {
    const broadcastData = {
      ...jobDetails,
      message: recordedMessage || generateMessage(),
      language: selectedLanguage,
      timestamp: new Date().toISOString(),
      type: recordedMessage ? 'voice' : 'text-to-speech'
    };
    
    console.log('Broadcasting job:', broadcastData);
    
    // In real app, this would send to Firebase/Supabase and notify workers
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const isFormValid = jobDetails.skill && jobDetails.count && jobDetails.location && jobDetails.wage;

  if (broadcastSent) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">📢</div>
          <h2 className="text-xl font-semibold text-green-800 mb-2">Job Broadcasted!</h2>
          <p className="text-green-700 mb-4">
            Your job requirement has been sent to workers in the area.
          </p>
          <div className="text-sm text-green-600">
            Workers will receive voice notifications on their devices.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="text-3xl mr-3">📢</span>
          Broadcast Job Requirement
        </h1>

        {/* Language Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Broadcast Language</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedLanguage('hindi')}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedLanguage === 'hindi'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setSelectedLanguage('english')}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedLanguage === 'english'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              English
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skill Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Skill</label>
            <select
              value={jobDetails.skill}
              onChange={(e) => handleInputChange('skill', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select skill needed</option>
              {skills.map(skill => (
                <option key={skill.id} value={skill.id}>
                  {skill.icon} {skill.name} ({skill.hindi})
                </option>
              ))}
            </select>
          </div>

          {/* Number of Workers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Workers</label>
            <input
              type="number"
              value={jobDetails.count}
              onChange={(e) => handleInputChange('count', e.target.value)}
              placeholder="e.g., 5"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Location</label>
            <select
              value={jobDetails.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select location</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Daily Wage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Wage (₹)</label>
            <input
              type="number"
              value={jobDetails.wage}
              onChange={(e) => handleInputChange('wage', e.target.value)}
              placeholder="e.g., 500"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Work Duration</label>
          <input
            type="text"
            value={jobDetails.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            placeholder="e.g., Starting tomorrow, 1 week project"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Additional Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details (Optional)</label>
          <textarea
            value={jobDetails.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Any additional requirements or details..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Message Preview */}
        {isFormValid && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Message Preview:</span>
              <button
                onClick={handleTextToSpeech}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
              >
                <span>🔊</span>
                <span>Preview Audio</span>
              </button>
            </div>
            <div className="text-gray-800 bg-white p-3 rounded border">
              {generateMessage()}
            </div>
          </div>
        )}

        {/* Voice Recording Option */}
        <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Or record a custom voice message:
            </div>
            
            {!recordedMessage ? (
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  isRecording
                    ? 'bg-red-500 text-white cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isRecording ? '🎤 Recording...' : '🎤 Record Voice Message'}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="text-green-600 font-medium">✓ Voice message recorded</div>
                <button
                  onClick={() => setRecordedMessage('')}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Record Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Send Broadcast Button */}
        <div className="mt-8">
          <button
            onClick={sendBroadcast}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-lg font-semibold text-lg ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            📢 Send Job Broadcast
          </button>
          
          {!isFormValid && (
            <div className="mt-2 text-sm text-red-600">
              Please fill in skill, number of workers, location, and wage to send broadcast.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBroadcast;