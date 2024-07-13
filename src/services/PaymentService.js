import axios from "./customized-axios";

export const createVNPayPayment = (amount, orderId) =>
  axios.get(
    `api/payment/vn-pay?amount=${amount}&bankCode=NCB&orderId=${orderId}`
  );
