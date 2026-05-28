const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Automatic HTML Redirection for home root
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <meta http-equiv="refresh" content="0;url=/main" />
                <title>Loading Gateway...</title>
            </head>
            <body>
                <script>window.location.href = "/main";</script>
            </body>
        </html>
    `);
});

// Advanced Scraping & Anti-Block Engine
app.get('/main', async (req, res) => {
    try {
        const targetUrl = 'https://advisors.broadridge.com';
        
        // Full Real Desktop Browser Simulation Headers
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Sec-Ch-Ua': '"Chromium";v="125", "Google Chrome";v="125", "Not-A.Brand";v="99"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 15000 // 15 seconds timeout feature
        });

        // Send the fetched clean HTML directly to the browser
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(response.data);

    } catch (error) {
        console.error('Proxy Error:', error.message);
        
        // Premium Fallback Feature: If still blocked, fallback to a clean iframe alternative
        res.status(200).send(`
            <html>
                <head>
                    <title>Secure Gateway</title>
                    <style>
                        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                        iframe { width: 100%; height: 100%; border: none; }
                    </style>
                </head>
                <body>
                    <iframe src="https://advisors.broadridge.com" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
                </body>
            </html>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Ultimate Server running successfully on port ${PORT}`);
});
