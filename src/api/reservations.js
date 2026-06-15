const API = import.meta.env.VITE_API;

/**
 * get all reservations for the user
 * a valid token is required
 */
export async function getReservations(token) {
  try {
    const response = await fetch(API + "/reservations", {
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

/**
 * create a new reservation for the user
 * a valid token is required
 */
export async function makeReservation(token, bookId) {
  const response = await fetch(API + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ bookId }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * remove a reservation for the user
 * a valid token is required
 */
export async function removeReservation(token, id) {
  const response = await fetch(API + "/reservations/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
