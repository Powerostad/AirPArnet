import axios from "axios";

export default axios.create({
  baseURL: "http://91.107.174.28:8010",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
