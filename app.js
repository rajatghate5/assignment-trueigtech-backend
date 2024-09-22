const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes.js/bookRoutes');
const { initDb } = require('./models'); 
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', bookRoutes);

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to sync database:', error);
});
