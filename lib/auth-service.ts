const AUTH_KEY = "auth_user";

export const getCurrentUser = () => {
  const user = sessionStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: any) => {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const removeCurrentUser = () => {
  sessionStorage.removeItem(AUTH_KEY);
};
