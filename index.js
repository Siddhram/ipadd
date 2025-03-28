const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.set('trust proxy', true);

app.get('/get-ip-location', async (req, res) => {
    let userIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    // Avoid localhost IP (::1)
    if (userIp === '::1' || userIp.startsWith('::ffff:127.0.0.1')) {
        return res.json({ message: 'Localhost detected. Cannot fetch location.' });
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${userIp}`);
        const data = await response.json();

        res.json({
            message: 'User IP and Location detected',
            ip: userIp,
            country: data.country,
            region: data.regionName,
            city: data.city,
            lat: data.lat,
            lon: data.lon,
            isp: data.isp
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching location data', error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
