import axios from 'axios';

export async function getUser() {
    const response = await axios.get('https://randomuser.me/api/');
    return response.data.results[0];
}
