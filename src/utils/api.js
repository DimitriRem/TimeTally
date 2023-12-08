export const API_URL = "http://localhost:3500";

export const api = (url, method = "GET", body) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && {
      body: JSON.stringify(body),
    }),
  };
  return fetch(API_URL + url, options);
};
