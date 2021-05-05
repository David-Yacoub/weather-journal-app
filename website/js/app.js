/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Here is the client side code that would make a GET request to the weather info API:

const apiKey = '5057777b56f6544982feb46222537c68';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    let zipCode = document.getElementById('zip').value;
    let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL)
        .then(function(data) {
            postData('/add', { date: newDate, city: data.name, temperature: data.main.temp, feel: feelings })
        })
        .then(
            updateUI()
        )

}
const getWeather = async(baseURL) => {


        const res = await fetch(baseURL)
        try {
            const data = await res.json();
            return data;


        } catch (error) {
            alert('Please Insert a valid Zipcode')
            console.log("error", error);
            // appropriately handle the error
        }

    }
    // post data to server

const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }

}
const updateUI = async() => {
    const request = await fetch('/get');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `&#8986  Date: ${allData.date}`;
        document.getElementById('city').innerHTML = `&#127969 City: ${allData.city}`;
        document.getElementById('temp').innerHTML = `&#127777       Temperature: ${allData.temperature}\u00B0C`;
        document.getElementById('content').innerHTML = `&#12796 Your feelings: ${allData.feel}`;


    } catch (error) {
        console.log("error", error);
    }
}