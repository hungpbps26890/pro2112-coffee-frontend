import axios from "./customized-axios";

export const postCreateDrink = (data) => {
  return axios.post("/api/drinks", data);
};

export const fetchGetAllDrinks = () => {
  return axios.get("/api/drinks");
};

export const fetchGetDrinkById = (id) => {
  return axios.get(`/api/drinks/${id}`);
};

export const putUpdateDrink = (id, data) => {
  return axios.put(`/api/drinks/${id}`, data);
};

export const deleteDrinkById = (id) => {
  return axios.delete(`/api/drinks/delete/${id}`);
};

export const fetchGetDrinksByCategoryId = (id) => {
  return axios.get(`api/drinks/category/${id}`);
};
