const API_URL = ""
export const api = async (endpoint, method = "GET", body) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  const text = await res.text(); 
  console.log("STATUS:", res.status);
  console.log("RESPONSE:", text);

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return JSON.parse(text);
};