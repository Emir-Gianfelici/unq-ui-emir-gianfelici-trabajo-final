import Axios, { formToJSON } from 'axios';

const API_URL = "https://preguntados-api.vercel.app/api";
const HEADER_AUTH = "Authorization";

const getToken = () => localStorage.getItem(HEADER_AUTH);
const setToken = (token) => localStorage.setItem(HEADER_AUTH, token);
const clearToken = () => localStorage.removeItem(HEADER_AUTH);
const header = () => ({headers: {[HEADER_AUTH]: getToken()}});


const get = (url, header) => 
    Axios.get(url, header)
        .then((response) => response)
        .catch((error) => Promise.reject(error.response.data));

const post = (url, body, header) => 
    Axios.post(url, body, header)
        .then((response) => response)
        .catch((error) => Promise.reject(error.response.data));

const put = (url, header) => 
    Axios.put(url, {}, header)
        .then((response) => response)
        .catch((error) => Promise.reject(error.response.data));

const get_difficulties = () => get(`${API_URL}/difficulty`);

const get_questions = (difficulty) => get(`${API_URL}/questions?difficulty=${difficulty}`);

const post_answer = (answer_body) => post(`${API_URL}/answer`, answer_body);


const Api = {
    get_difficulties,
    get_questions,
    post_answer
}

export default Api;