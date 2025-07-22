const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API endpoint
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;

  // If no date provided, use current date
  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If it's a UNIX timestamp in milliseconds
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise try parsing as ISO date
    date = new Date(dateParam);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
