const API_URL = "http://localhost:5000";

export async function getHello() {
  const response = await fetch(`${API_URL}/`);
  const data = await response.text();
  return data;
}
