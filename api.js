import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_API_URL,
  params: {},
});

export default request;
