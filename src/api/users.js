const API = import.meta.env.VITE_API;

/**
 * get user information
 * a valid token is required
 */
export async function getUser(token) {
  try {
    const response = await fetch(API + "/users/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}
