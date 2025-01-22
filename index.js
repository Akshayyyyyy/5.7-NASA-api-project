//Pass the data (apod, pastApods, nextLaunch, and upcomingLaunches) to the EJS template.
import express from 'express';
import axios from 'axios';
require('dotenv').config();
 
const app = express();
const PORT = 3000;

// Make public folder static
app.use(express.static('public'));

// NASA API Setup
const nasaUrl = 'https://api.nasa.gov/planetary/apod';
const nasaApiKey = process.env.NASA_API_KEY;

// SpaceX url Setup
const spaceXUrl = 'https://api.spacexdata.com/v5/launches/upcoming';

// GET route that fetches data from both NASA and SpaceX APIs
app.get('/', async (req, res)=>{
    // fix date
    const date = req.query.date || '2025-01-20';
    try{
        // Fetch NASA current image data first
        const response = await axios.get(`${nasaUrl}?api_key=${nasaApiKey}&date=${date}`);
        const currentApod = response.data;
        
        // Setup for past date to get previous images
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 37);
        const startDate = pastDate.toISOString().split('T')[0];
        
        // fetch past NASA image data 
        const pastResponse = await axios.get(`${nasaUrl}?api_key=${nasaApiKey}&start_date=${startDate}&end_date=${date}`);
        const pastApods = pastResponse.data;

        // Fetch SpaceX data after NASA request is completed
        const spacexResponse = await axios.get(spaceXUrl);
        const upcomingLaunches = spacexResponse.data;

        const nextLaunch = upcomingLaunches[0];

        // Render NASA nad SpaceX data to the EJS template
        res.render('index.ejs', {
            apod : currentApod, pastApods,
            nextLaunch, 
            upcomingLaunches
        });
    } catch(error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Something went wrong');
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})
