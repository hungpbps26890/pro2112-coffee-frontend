import axios from "axios";

export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://vapi.vnappmob.com/api/province/",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicDistricts = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicWards = (districtId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://vapi.vnappmob.com/api/province/ward/${districtId}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
