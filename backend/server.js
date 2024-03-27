const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const equipmentRoutes = require('./routes/equipment');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(equipmentRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://root:root@equipment.agaas5e.mongodb.net/equipment?retryWrites=true&w=majority&appName=equipment';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => console.log('DB connection error', err));

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});