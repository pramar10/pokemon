export const API_ROOT_URL = "https://coingecko.p.rapidapi.com";

export const apiRequest = async ({ path, method = "GET", data = null }) => {
  try {
    const url = `${API_ROOT_URL}${path}`;
    const options = {
      method: method,
      headers: {
        "X-RapidAPI-Key": "ae99b99bbcmsh0964ff1d3b3bd2dp1fa7b4jsn68b44d2044d6",
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      },
      body: data ? JSON.stringify(data) : data,
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (responseData?.error === "invalid_grant") {
      return {
        error: "Invalid Login Details",
        error_description:
          "Please check, your username and password is correct.",
      };
    }
    return responseData;
  } catch (e) {
    console.log(e);
    let message = {
      error: "Network Error",
      error_description: `Not able to connect with the server`,
    };
    return message;
  }
};
