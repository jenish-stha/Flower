// Vercel Serverless Function for device login tracking
// Simple in-memory storage (persists during Vercel session)
// For persistent storage, consider using KV, Postgres, or MongoDB

let deviceLogins = [];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  try {
    // GET - Retrieve all device logins
    if (req.method === 'GET') {
      // Sort by timestamp descending (newest first)
      const sorted = [...deviceLogins].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      return res.status(200).json({ 
        success: true,
        count: sorted.length,
        logins: sorted 
      });
    }

    // POST - Add new device login
    if (req.method === 'POST') {
      const loginData = req.body;
      
      // Validate required fields
      if (!loginData.deviceType || !loginData.timestamp) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: deviceType, timestamp' 
        });
      }

      // Add unique ID
      const newLogin = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...loginData,
        createdAt: new Date().toISOString()
      };

      deviceLogins.push(newLogin);

      console.log(`✅ Device login added: ${newLogin.deviceName || 'Unknown'}`);
      console.log(`📊 Total logins: ${deviceLogins.length}`);

      return res.status(201).json({ 
        success: true,
        message: 'Device login recorded',
        login: newLogin,
        totalLogins: deviceLogins.length
      });
    }

    // DELETE - Clear all device logins
    if (req.method === 'DELETE') {
      const count = deviceLogins.length;
      deviceLogins = [];

      console.log(`🗑️ Cleared ${count} device logins`);

      return res.status(200).json({ 
        success: true,
        message: `Deleted ${count} device logins`,
        logins: []
      });
    }

    // Unsupported method
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('Error in device-logins API:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error: ' + error.message 
    });
  }
}
