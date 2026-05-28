const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

// Home route auto-redirection
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

// Advanced Proxy & Anti-Block Gateway
app.get('/main', (req, res) => {
    const targetUrl = 'https://advisors.broadridge.com';
    
    const options = {
        hostname: 'advisors.broadridge.com',
        port: 4443,
        path: '/',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        },
        timeout: 10000
    };

    const proxyReq = https.request(options, (proxyRes) => {
        let data = '';
        proxyRes.on('data', (chunk) => { data += chunk; });
        proxyRes.on('end', () => {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(data);
        });
    });

    proxyReq.on('error', (err) => {
        console.log('Using secure fallback interface...');
        // Premium Fallback Mode: Loads via secure iframe if direct fetch is blocked
        res.status(200).send(`
            <html>
                <head>
                    <title>Secure Gateway Panel</title>
                    <style>
                        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; }
                        iframe { width: 100%; height: 100%; border: none; }
                    </style>
                </head>
                <body>
                    <iframe src="${targetUrl}" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
                </body>
            </html>
        `);
    });

    proxyReq.end();
});

app.listen(PORT, () => {
    console.log(`Server running smoothly on port ${PORT}`);
});
