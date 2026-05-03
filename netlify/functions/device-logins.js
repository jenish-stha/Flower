// Simple in-memory device login database API
// This Netlify Function stores all device logins server-side

// Simple in-memory storage (persists during Netlify session)
let deviceLogins = [];

export default async (req, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  try {
    // GET - Retrieve all device logins
    if (req.method === 'GET') {
      // Sort by timestamp descending (newest first)
      const sorted = [...deviceLogins].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      return new Response(JSON.stringify({ 
        success: true,
        count: sorted.length,
        logins: sorted 
      }), { status: 200, headers });
    }

    // POST - Add new device login
    if (req.method === 'POST') {
      const loginData = await req.json();
      
      // Validate required fields
      if (!loginData.deviceType || !loginData.timestamp) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: deviceType, timestamp' 
        }), { status: 400, headers });
      }

      // Add unique ID and timestamp
      const newLogin = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...loginData,
        createdAt: new Date().toISOString()
      };

      deviceLogins.push(newLogin);

      console.log(`✅ Device login added: ${newLogin.deviceName || 'Unknown'}`);
      console.log(`📊 Total logins: ${deviceLogins.length}`);

      return new Response(JSON.stringify({ 
        success: true,
        message: 'Device login recorded',
        login: newLogin,
        totalLogins: deviceLogins.length
      }), { status: 201, headers });
    }

    // DELETE - Clear all device logins
    if (req.method === 'DELETE') {
      const count = deviceLogins.length;
      deviceLogins = [];

      console.log(`🗑️ Cleared ${count} device logins`);

      return new Response(JSON.stringify({ 
        success: true,
        message: `Deleted ${count} device logins`,
        logins: []
      }), { status: 200, headers });
    }

    // Method not allowed
    return new Response(JSON.stringify({ 
      error: 'Method not allowed. Use GET, POST, or DELETE' 
    }), { status: 405, headers });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), { status: 500, headers });
  }
};
