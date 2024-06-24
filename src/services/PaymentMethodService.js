import axios from "./customized-axios";

export const fetchGetAllPaymentMethods = () =>
  axios.get("/api/payment-methods");
