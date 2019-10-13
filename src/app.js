// Import modules
const path = require('path');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const resumeRoute = require('./routes/resume');
const careerRoute = require('./routes/career');
const enquiryRoute = require('./routes/enquiry');

const db = require('./db/mongoose');

// Initialize Database connection
db();

// Create express app.
const app = express();

// Server port
const port = process.env.PORT || 3500;

const filePath = path.join(__dirname, '../uploads');

// Set up middleware
app.use(express.json());
app.use(cors());
app.use(express.static(filePath));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '../temp')
}));

// configure routes
app.use(resumeRoute);
app.use(careerRoute);
app.use(enquiryRoute);

// Start server
app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});


