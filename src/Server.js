const leaguejs = require('leaguejs');
const cors = require('cors');
const express = require('express');
const API_KEY = 'RGAPI-557bd1de-65c8-4c46-928a-a4851b0cdd45';
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

api.StaticData
  .gettingProfileIcons(req.params.summonerName)
  .then(data => {
    return res.json(data);
  })
  .catch(err => {
    return res.json(err);
  });

app.listen(3001);
console.log('Running on port 3001');
