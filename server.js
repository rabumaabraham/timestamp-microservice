const express = require('express');
const app = express();

// Enable CORS for testing on FCC
const cors = require('cors');
app.use(cors());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running!');
});

// Timestamp API endpoint
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  let date;

  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If it's a number (UNIX timestamp)
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise try to parse it as a date string
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
