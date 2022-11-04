class utility {}

export const apiHandler = async (apiUrl, method, data = {}) => {
  console.log("in api handler");
  let baseUrl =
    "https://virtserver.swaggerhub.com/vaibhav5/Contruction-Service/1.1";
  let requestUrl = baseUrl + apiUrl;
  var requestOptions = {
    method,
    redirect: "follow",
  };
  let orgList = [];
  await fetch(requestUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => (orgList = result));
  return orgList;
};

export default utility;
