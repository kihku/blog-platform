function objToParamString(params: object) {
  console.log("param: " + JSON.stringify(params));
  let result = "";
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      console.log(value, result ? "&" : "" + `${key}=${value}`);
      result += (result ? "&" : "") + `${key}=${value}`;
    }
  }
  return result;
}
type props = {
  body?: object;
  token?: string;
  params?: object;
  headers?: object;
  url: string;
  method: string | undefined;
};
export async function send_request({
  method = "GET",
  url = "",
  headers = {},
  params = {},
  body,
  token,
}: props) {
  const searchParams = objToParamString(params);
  url = url + (searchParams ? "?" : "") + searchParams;
  const result = await fetch(process.env.SERVER_HOST + url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    method: method,
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
  });
  if (!result.ok) {
    throw new Error(`Response status: ${result.status}`);
  }

  return await result.json();
}
