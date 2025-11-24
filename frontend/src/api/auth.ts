const API_URL = "https://chat-app-iafk.onrender.com";

export async function registerUser(data: {
  phone: string;
  name: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Registration error");
  }

  return json;
}