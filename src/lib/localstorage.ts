export const usernames = ["pepik", "barman", "pavel", ""];

export type User = typeof usernames[number];

export function storeUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser(): User {
  const user = localStorage.getItem("user");
  if (user === null) {
    return "";
  }
  return JSON.parse(user);
}