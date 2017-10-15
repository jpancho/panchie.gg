const leaguejs = require('leaguejs');
const cors = require('cors');
const express = require('express');
const API_KEY = 'RGAPI-283e6bbb-0ec5-41de-b015-ae8a73d264c7';
const api = new leaguejs(API_KEY);
const app = express();

app.use(cors());
app.get('/api/:summonerName', (req, res) => {
api.Summoner
    .gettingByName(req.params.summonerName)
    .then(data => {
        return res.json(data);
    })
    .catch(err => {
        return res.json(err);
    });
});

app.listen(3001);
