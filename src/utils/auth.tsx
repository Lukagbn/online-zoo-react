export function getUserFromToken() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload as {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
