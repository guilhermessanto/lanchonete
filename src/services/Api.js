import axios from "axios";
const api = axios.create({
  /* 
  baseURL: "http://10.20.45.28:3002", */
  //baseURL: "http://10.20.45.23:3002",
  baseURL: "https://bd-lanchonelio-default-rtdb.firebaseio.com/",
  /* baseURL: "https://app-lanchonelio-3c79d-default-rtdb.firebaseio.com/", */
});

export default api;
