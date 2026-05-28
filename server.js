const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

// Automatically handles the home route and redirects cleanly
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <meta http-equiv="refresh" content="0;url=/main" />
            </head>
            <body>
                <script>window.location.href = "/main";</script>
            </body>
        </html>
    `);
});

// Advanced proxy setup with secure header mimicking
app.use('/main', createProxyMiddleware({
    target: 'https://advisors.broadridge.com',
    changeOrigin: true,
    secure: false, // Bypasses SSL strict checks if necessary
    followRedirects: true, // Automatically follows multi-level redirects
    logger: console,
    on: {
        proxyReq: (proxyReq, req, res) => {
            // Mimics a real Windows Chrome Browser completely to prevent blocking
            proxyReq.setHeader('host', 'advisors.broadridge.com');
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
            proxyReq.setHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7');
            proxyReq.setHeader('Accept-Language', 'en-US,en;q=0.9');
            proxyReq.setHeader('Accept-Encoding', 'gzip, deflate, br');
            proxyReq.setHeader('Cache-Control', 'max-age=0');
            proxyReq.setHeader('Sec-Ch-Ua', '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"');
            proxyReq.setHeader('Sec-Ch-Ua-Mobile', '?0');
            proxyReq.setHeader('Sec-Ch-Ua-Platform', '"Windows"');
            proxyReq.setHeader('Sec-Fetch-Dest', 'document');
            proxyReq.setHeader('Sec-Fetch-Mode', 'navigate');
            proxyReq.setHeader('Sec-Fetch-Site', 'none');
            proxyReq.setHeader('Sec-Fetch-User', '?1');
            proxyReq.setHeader('Upgrade-Insecure-Requests', '1');
        },
        proxyRes: (proxyRes, req, res) => {
            // Fixes potential cookie path issues coming from the destination site
            if (proxyRes.headers['set-cookie']) {
                proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map(cookie => 
                    cookie.replace(/Domain=[^;]+;?/, '')
                );
            }
        }
    }
}));

app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});
