const express = require('express');

const router = express.Router();

const IMAGES = [
  'http://24.media.tumblr.com/tumblr_lg1h6c0HXp1qfyzelo1_1280.jpg',
  'http://25.media.tumblr.com/tumblr_m4f85huQLT1qdlh1io1_400.gif',
  'http://24.media.tumblr.com/tumblr_m3ms5mz9V81r73wdao1_500.jpg',
  'http://24.media.tumblr.com/tumblr_m2n9qpUlNX1qhwmnpo1_1280.jpg',
  'http://24.media.tumblr.com/tumblr_mc2e05XA1N1qhwmnpo1_500.jpg'
];

router.get('/api', (req, res) => {
  const index = Math.round(Math.random() * (IMAGES.length));
  res.json({
    image: IMAGES[index] || IMAGES[0]
  });
});

module.exports = router;
