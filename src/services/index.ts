import axios from "axios";

export const baseURL = "/api/";

const ClockInApi = axios.create({
  baseURL: baseURL,
});

export default ClockInApi;
