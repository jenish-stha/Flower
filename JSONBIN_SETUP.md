# JSONBin Setup Guide - Cross-Device Login Tracking (30 seconds)

## What is JSONBin?
JSONBin.io is a **free JSON storage service** that lets all your devices share data in real-time. No complicated setup - just copy-paste!

## Quick Setup (2 steps)

### Step 1: Create a Free JSONBin Account (10 seconds)

1. Go to **https://jsonbin.io**
2. Click **"Create a Bin"** (no signup required for basic use!)
3. Copy the content from the code box or paste this:
```json
{
  "deviceLogins": []
}
```
4. Click **"Create"**

### Step 2: Copy Your Credentials (10 seconds)

On the page that opens:
- **Bin ID** - Copy the long ID from the URL or the "Bin ID" field
- **API Key** - Click "API Keys" and copy your key (or use `YOUR_JSONBIN_API_KEY` as placeholder)

### Step 3: Add to Your Files (10 seconds)

#### In `index.html` (around line 415):
Replace:
```javascript
const JSONBIN_ID = "YOUR_JSONBIN_ID";
const JSONBIN_API_KEY = "YOUR_JSONBIN_API_KEY";
```

With your actual credentials:
```javascript
const JSONBIN_ID = "65abc12345...";  // Your Bin ID
const JSONBIN_API_KEY = "$2b$10$..."; // Your API Key
```

#### In `admin.html` (around line 350):
Do the same thing - replace with your credentials.

## That's It! 🎉

Now when you:
1. **Open the flower page on Device A** → a login is recorded
2. **Open the admin panel on Device B** → you instantly see the login from Device A!

## How It Works

- **Device A** (flower page): Creates a flower → sends login data to JSONBin
- **JSONBin**: Stores the data in the cloud
- **Device B** (admin page): Reads from JSONBin → shows all logins from all devices

## Testing

1. Open `index.html` on one device/browser
2. Click to create flowers
3. Open `admin.html` on a different device/browser
4. Login with password: `admin123`
5. You should see the logins appear! ✨

## Troubleshooting

**Not seeing data?**
1. Check that your JSON IDs were copied correctly
2. Make sure you created the bin with `{"deviceLogins": []}` structure
3. Try refreshing the admin page (F5)
4. Check browser console (F12) for error messages

**"JSONBin not configured" in console?**
This is normal if you haven't added your credentials yet.

## Free Tier Limits

- **Unlimited bins** ✅
- **Unlimited reads** ✅
- **Unlimited writes** ✅
- **No credit card needed** ✅
- **Perfect for this use case** ✅

## Security Note

For production:
- Keep your API key private
- Consider using Firebase or Supabase instead for better security
- JSONBin is great for demos/testing

---

That's all! Your flower app now works across multiple devices! 🌸✨
