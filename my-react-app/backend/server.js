const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // או כל פורט אחר שתבחר

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
