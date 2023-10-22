import axios from 'axios';

// OpenWeather API

export async function fetchData(city) {
  const APIKey = '18bc5ce4b9de87f513f8f04a64722bb8';
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=tr&appid=${APIKey}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}