// API Configuration File
// Replace the API keys below with your own free API keys

const API_CONFIG = {
    // UNSPLASH API (Best Quality - RECOMMENDED)
    // Get free key: https://unsplash.com/developers
    // Steps: 1. Create account 2. Create new app 3. Copy Access Key
    unsplash: {
        accessKey: 'YOUR_UNSPLASH_ACCESS_KEY_HERE',
        enabled: true
    },
    
    // PEXELS API (Great Alternative)
    // Get free key: https://www.pexels.com/api/
    // Steps: 1. Create account 2. Generate API Key
    pexels: {
        apiKey: 'NR9zHBReOGpgUWvWd3vTdCpB5v0JLhpr0k82OpiSavGjHffUFX1FRKI0',
        enabled: true
    },
    
    // PIXABAY API (Good Backup)
    // Get free key: https://pixabay.com/api/docs/
    // Steps: 1. Create account 2. Get API Key from dashboard
    pixabay: {
        apiKey: 'YOUR_PIXABAY_API_KEY_HERE',
        enabled: true
    }
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
