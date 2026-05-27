const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.redirect('/main');
});

app.use('/main', createProxyMiddleware({
    target: 'https://pronhub.com',
    changeOrigin: true,
    pathRewrite: {
        '^/main': '',
    },
    ws: true
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

