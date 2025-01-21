//Pass the data (apod, pastApods, nextLaunch, and upcomingLaunches) to the EJS template.
import express from 'express';
import axios from 'axios';
 
const app = express();
const PORT = 3000;

app.use(express.static('public'));

const nasaUrl = 'https://api.nasa.gov/planetary/apod';
const nasaApiKey = 'YsekNWZ4I8spQrWPkJ8AOFaNKwVGsytlGFLCFbX1'

app.get('/', async (req, res)=>{
    const date = req.query.date || '2025-01-20';
    try{
        const response = await axios.get(`${nasaUrl}?api_key=${nasaApiKey}&date=${date}`);
        const currentApod = response.data;
        
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 37);
        const startDate = pastDate.toISOString().split('T')[0];
    
        const pastResponse = await axios.get(`${nasaUrl}?api_key=${nasaApiKey}&start_date=${startDate}&end_date=${date}`);
        const pastApods = pastResponse.data;

        res.render('index.ejs', {apod : currentApod, pastApods });
    } catch(error) {
        res.render("index.ejs", { apod : error.response.data });
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})