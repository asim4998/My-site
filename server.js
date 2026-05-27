const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

// Redirect home root to the proxy path
app.get('/', (req, res) => {
    res.redirect('/main');
});

// Proxy setup targeting asim.com
app.use('/main', createProxyMiddleware({
    target: 'https://xnxx.com',
    changeOrigin: true,
    logger: console,
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('host', 'xnxx.com');
        }
    }
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
