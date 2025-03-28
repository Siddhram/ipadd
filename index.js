const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.set('trust proxy', true); // Trust proxy for real IP

app.get('/get-ip', (req, res) => {
    let userIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    console.log(`User's IP Address: ${userIp}`);
    res.json({ message: 'User IP detected', ip: userIp });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
