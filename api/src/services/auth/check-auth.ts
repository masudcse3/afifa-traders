/** @format */

export const checkAuth = async (token: string) => {
  if (!token) return false;
  return true;
};
