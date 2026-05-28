const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

// Automatic HTML redirection for the home root to load the proxy immediately
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <meta http-equiv="refresh" content="0;url=/main" />
                <title>Loading...</title>
            </head>
            <body>
                <script>window.location.href = "/main";</script>
            </body>
        </html>
    `);
});

// Ultimate proxy engine setup targeting asim.com
app.use('/main', createProxyMiddleware({
    target: 'https://xnxx.com',
    changeOrigin: true,
    secure: false,
    followRedirects: true,
    logger: console,
    on: {
        proxyReq: (proxyReq, req, res) => {
            // Mimics a real Windows Chrome Browser completely to prevent any blocking
            proxyReq.setHeader('host', 'xnxx.com');
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
            proxyReq.setHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8');
            proxyReq.setHeader('Accept-Language', 'en-US,en;q=0.9');
            proxyReq.setHeader('Cache-Control', 'max-age=0');
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
    console.log(`Proxy server is running successfully on port ${PORT}`);
});
