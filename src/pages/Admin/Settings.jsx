import { FiSettings, FiSave, FiUsers, FiBook, FiClock, FiBell, FiMail, FiAlertCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function AdminSettings() {
  // State for all settings
  const [settings, setSettings] = useState({
    loanPeriod: 14,
    maxRenewals: 2,
    fineAmount: 10,
    overdueNotifications: true,
    reservationHoldPeriod: 3,
    emailNotifications: true,
    emailAddress: 'notifications@library.edu',
    allowSelfRegistration: true,
    allowBookRenewals: true,
    allowReservations: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState({...settings});

  // System information (static)
  const systemInfo = {
    version: '2.4.1',
    lastUpdated: 'June 15, 2023',
    databaseSize: '245 MB',
    activeUsers: '1,892',
    uptime: '99.98%'
  };

  // Check for changes
  useEffect(() => {
    const changesDetected = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasChanges(changesDetected);
  }, [settings, originalSettings]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOriginalSettings({...settings});
      setHasChanges(false);
      setSaveStatus({ type: 'success', message: 'Settings saved successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to save settings. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle maintenance actions
  const handleMaintenanceAction = (action) => {
    console.log(`Performing ${action}...`);
    // In a real app, this would trigger the appropriate API call
    alert(`${action} initiated. This would perform the action in a real application.`);
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            System <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Settings</span>
          </h1>
          <p className="text-gray-600">Configure library management system</p>
        </div>
        
        <div className="flex items-center gap-3">
          {saveStatus && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              saveStatus.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <FiAlertCircle />
              <span className="text-sm">{saveStatus.message}</span>
            </div>
          )}
          
          <button 
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-md transition-all ${
              hasChanges 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Circulation Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FiBook size={20} />
              </div>
              <span>Circulation Settings</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Period (days)</label>
                <input
                  type="number"
                  name="loanPeriod"
                  value={settings.loanPeriod}
                  onChange={handleInputChange}
                  min="1"
                  max="60"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Renewals</label>
                <input
                  type="number"
                  name="maxRenewals"
                  value={settings.maxRenewals}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fine Amount (₹/day)</label>
                <input
                  type="number"
                  name="fineAmount"
                  value={settings.fineAmount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reservation Hold Period (days)</label>
                <input
                  type="number"
                  name="reservationHoldPeriod"
                  value={settings.reservationHoldPeriod}
                  onChange={handleInputChange}
                  min="1"
                  max="14"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <FiBell size={20} />
              </div>
              <span>Notification Settings</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Send Overdue Notifications</h3>
                  <p className="text-xs text-gray-500">Enable email reminders for overdue items</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="overdueNotifications"
                    checked={settings.overdueNotifications}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Enable Email Notifications</h3>
                  <p className="text-xs text-gray-500">Allow system to send email notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notification Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="emailAddress"
                    value={settings.emailAddress}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!settings.emailNotifications}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* User Permissions */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <FiUsers size={20} />
              </div>
              <span>User Permissions</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Allow Self-Registration</h3>
                  <p className="text-xs text-gray-500">Let users create their own accounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowSelfRegistration"
                    checked={settings.allowSelfRegistration}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Allow Book Renewals</h3>
                  <p className="text-xs text-gray-500">Let users renew borrowed items</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowBookRenewals"
                    checked={settings.allowBookRenewals}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Allow Reservations</h3>
                  <p className="text-xs text-gray-500">Let users reserve checked-out items</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowReservations"
                    checked={settings.allowReservations}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                <FiSettings size={20} />
              </div>
              <span>System Information</span>
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Version</span>
                <span className="font-medium">{systemInfo.version}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Updated</span>
                <span className="font-medium">{systemInfo.lastUpdated}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Database Size</span>
                <span className="font-medium">{systemInfo.databaseSize}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Active Users</span>
                <span className="font-medium">{systemInfo.activeUsers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uptime</span>
                <span className="font-medium">{systemInfo.uptime}</span>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <FiClock size={20} />
              </div>
              <span>System Maintenance</span>
            </h2>
            
            <div className="space-y-4">
              <button 
                className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => handleMaintenanceAction('Backup Database')}
              >
                Backup Database
              </button>
              <button 
                className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => handleMaintenanceAction('Clear Cache')}
              >
                Clear Cache
              </button>
              <button 
                className="w-full px-4 py-2.5 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                onClick={() => {
                  if (window.confirm('Are you sure you want to restart the system?')) {
                    handleMaintenanceAction('System Restart');
                  }
                }}
              >
                System Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}