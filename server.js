const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

// Automatic HTML redirection for the home root
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

// Proxy engine setup targeting asim.com
app.use('/main', createProxyMiddleware({
    target: 'https://asim.com',
    changeOrigin: true,
    logger: console,
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('host', 'asim.com');
        }
    }
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
