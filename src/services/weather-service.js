import http from "./http-service";
import { apiUrl } from "../config.json";

export default async function getWeatherFromGoogle(location) {
  try {
    const response = await http.get(`${apiUrl}/google?location=${location}`);
    return response.data;
  } catch (err) {
    return err;
  }
}
