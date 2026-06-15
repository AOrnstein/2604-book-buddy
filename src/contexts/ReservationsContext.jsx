import { createContext, useContext, useState } from "react";
import {
  getReservations,
  makeReservation,
  removeReservation,
} from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

const ReservationsContext = createContext();

export function ReservationsProvider({ children }) {
  const [reservations, setReservations] = useState([]);
  const { token } = useAuth();

  const syncReservations = async () => {
    const data = await getReservations(token);
    setReservations(data);
  };

  /** Tries to make a reservation. Throws an Exception on failure. */
  const reserveBook = async (bookId) => {
    await makeReservation(token, bookId);
    await syncReservations();
  };

  const returnBook = async (reservationId) => {
    await removeReservation(token, reservationId);
    await syncReservations();
  };

  const value = { reservations, reserveBook, returnBook };
  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationsContext);
  if (!context)
    throw Error("useReservations must be used within ReservationsProvider");
  return context;
}
