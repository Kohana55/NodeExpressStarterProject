// Web app
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Mongoose
const mongoose = require('mongoose');
const uri = "mongodb+srv://Lewis:MateClwb03@hapinin.2r3xf.mongodb.net/";
mongoose.connect(uri).then(() => {
    console.log("Connected to Atlas MongoDB")
})

app.use(cors({
    origin: 'http://localhost:1337',  // Allow requests from Angular
    methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
}));

// App setup
app.use(express.json());

// Automatically load all route files from the "routes" directory
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
    if (file.endsWith('.js')) {
        const route = require(`./routes/${file}`);
        const routeName = file.replace('.js', '');
        app.use(`/${routeName}`, route);
    }
});


// Server listening
app.listen(8081, () => {
    console.log("Server started");
})