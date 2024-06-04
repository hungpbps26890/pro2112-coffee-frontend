import axios from "./customized-axios";

export const fetchAllCategories = () => axios.get("/api/categories");

export const fetchGetCategoryById = (id) => axios.get(`/api/categories/${id}`);
