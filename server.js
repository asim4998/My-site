const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Automatic HTML Redirection for home root
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <meta http-equiv="refresh" content="0;url=/main" />
                <title>Loading Secure Gateway...</title>
            </head>
            <body>
                <script>window.location.href = "/main";</script>
            </body>
        </html>
    `);
});

// Advanced Global Iframe Routing Engine (US/UK/Global Bypass)
app.get('/main', (req, res) => {
    // Target URL to open via proxy
    const targetUrl = 'https://asim.com'; 
    
    // Using an anonymous global proxy web gateway to load the site from outside Bangladesh
    const globalProxyGateway = 'https://www.croxyproxy.com/_cs/go?url=' + encodeURIComponent(targetUrl);

    res.status(200).send(`
        <html>
            <head>
                <title>Global Gateway Panel</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; }
                    iframe { width: 100%; height: 100%; border: none; }
                </style>
            </head>
            <body>
                <iframe src="${globalProxyGateway}" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Global Proxy Server running successfully on port ${PORT}`);
});
