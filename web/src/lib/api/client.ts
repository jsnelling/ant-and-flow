import axios from 'axios';

export const client = axios.create({ baseURL: '//localhost:8000' });
