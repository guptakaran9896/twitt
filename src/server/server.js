const express = require('express');
const Twit = require('twit');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const T = new Twit({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token: 'YOUR_ACCESS_TOKEN',
  access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET',
});

const checkFollows = async (screenNames) => {
  try {
    const result = await T.get('friendships/lookup', { screen_name: screenNames });
    return result.data.map((friendship) => {
      return {
        screen_name: friendship.screen_name,
        following: friendship.connections.includes('following'),
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

app.post('/check-follows', async (req, res) => {
  const { screenNames } = req.body;
  const result = await checkFollows(screenNames);

  res.json(result);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
