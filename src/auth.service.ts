import axios from "axios";
const API_URL = "http://localhost:5000/";
export const signup = (username: string, email: string,mobileNo:number, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    mobileNo,
    password,
  });
};
export const login = (username: string, password: string) => {
  return axios
    .post('http://localhost:5000/signin', {
      username,
      password,
    })
    .then((response) => {
        console.log(response.data.data.token,'s');
  
        
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
      }
      return response.data;
    });
};
export const logout = () => {
  localStorage.removeItem("user");
};
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};