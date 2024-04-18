import axios from 'axios';

// base url to make request to the movie database 
// axios works as postman
// https://api.themoviedb.org/3/movie/550?api_key=8ab181359a4a892d78e30c095464d92f

const instance = axios.create({
    baseURL: `https://api.themoviedb.org/3`
});


export default instance;