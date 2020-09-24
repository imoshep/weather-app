import http from './http-service';
import { apiUrl } from "../consfig.json";

export default async function getWeatherFromGoogle(location) {
    try {
        const response = await http.get(`${apiUrl}/google?location=${location}`);
        return response.data;
    } catch (err) {
        return {message: 'GET request failed', error: err};
    }
}

// export async function autoRefresh(location, pointerName) {
//     // const intervalPionter = pointerName
//     this[pointerName]  = setInterval(()=>{console.log(location)},3000)
// }

// export async function clearAutoRefresh(pointer) {
//     clearInterval(pointer)
// }

 