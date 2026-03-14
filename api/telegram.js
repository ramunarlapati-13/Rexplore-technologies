const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8704009081:AAERKhnUA6nPrX4LNxBlr8uUQyDxGuf6QMs';
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID; // You need to set this in Vercel/Environment
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'rexploretech';

export default async function handler(req, res) {
    // 1. Handle Admin Alerts (POST request from Website)
    if (req.method === 'POST' && req.body.type === 'admin_alert') {
        try {
            const { name, interest, id, referral } = req.body.data;
            const message = `🔔 *New Demo Request!*\n\n👤 *Name:* ${name}\n🚀 *Interest:* ${interest}\n🆔 *ID:* \`${id}\`\n🎁 *Referral:* ${referral || 'None'}`;
            
            await sendMessage(ADMIN_CHAT_ID, message);
            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // 2. Handle Telegram Webhook (Tracking)
    if (req.method === 'POST' && req.body.message) {
        const chat_id = req.body.message.chat.id;
        const text = req.body.message.text || '';

        // Welcome & Help Commands
        if (text.startsWith('/start') || text.startsWith('/help')) {
            const welcome = `🤖 *Welcome to Rexplore Tracker!* \n\nI am your AI assistant for project monitoring. Use the commands below to navigate:\n\n` +
                            `📜 *Commands List:*\n` +
                            `• \`/track <ID>\` — Check your project status\n` +
                            `• \`/getid\` — Get your Chat ID (For Admin Setup)\n` +
                            `• \`/help\` — Show this command list\n\n` +
                            `🌐 *Official Website:* [rexploretech.vercel.app](https://rexploretech.vercel.app/)\n\n` +
                            `🚀 *Example:* \`/track 7XzR9z\``;
            
            await sendMessage(chat_id, welcome);
            return res.status(200).send('OK');
        }

        // Get ID command (for admin setup)
        if (text.startsWith('/getid')) {
            await sendMessage(chat_id, `Your Chat ID is: \`${chat_id}\`\n\nCopy this and set it as ADMIN_CHAT_ID in your environment variables.`);
            return res.status(200).send('OK');
        }

        // Track command
        if (text.startsWith('/track')) {
            const trackingId = text.split(' ')[1];
            if (!trackingId) {
                await sendMessage(chat_id, "❌ Please provide a Tracking ID.\nExample: `/track 7XzR9` ");
                return res.status(200).send('OK');
            }

            try {
                // Fetch from Firestore via REST API
                const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/demo_requests/${trackingId}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    await sendMessage(chat_id, "❓ *ID Not Found.*\nPlease double check your Tracking ID and try again.");
                    return res.status(200).send('OK');
                }

                const doc = await response.json();
                const data = parseFirestore(doc.fields);
                
                const status = (data.status || 'Received').toUpperCase();
                let message = `📦 *Project Status Lookup*\n\n`;
                message += `👤 *Client:* ${data.name}\n`;
                message += `🚀 *Service:* ${data.interest}\n\n`;
                message += `📊 *Current Stage:* ${status}\n`;
                message += `📅 *Timeline:* ${data.timeline || 'TBD'}\n`;
                message += `\n🔗 [View on Rexplore Website](https://rexploretech.vercel.app/profile.html)`;

                await sendMessage(chat_id, message);
            } catch (err) {
                await sendMessage(chat_id, "⚠️ error fetching data from Rexplore servers.");
            }
            return res.status(200).send('OK');
        }
    }

    res.status(200).send('Bot is active');
}

// Helper: Send Message to Telegram
async function sendMessage(chat_id, text) {
    if (!chat_id) throw new Error("Chat ID is missing");
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chat_id,
            text: text,
            parse_mode: 'Markdown'
        })
    });
}

// Helper: Parse Firestore REST response
function parseFirestore(fields) {
    const res = {};
    for (const key in fields) {
        const valObj = fields[key];
        res[key] = valObj.stringValue || valObj.integerValue || valObj.booleanValue || '';
    }
    return res;
}
