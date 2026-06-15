import { redirect } from "react-router";
import { getUser } from "../api/users";
import { useReservations } from "../contexts/ReservationsContext";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function AccountPage() {
  const [user, setUser] = useState([]);
  const { token } = useAuth();
  const { reservations, syncReservations } = useReservations();

  useEffect(() => {
    const syncUser = async () => {
      const data = await getUser(token);
      setUser(data);
      if (!data) redirect("/books");
    };
    syncReservations();
    syncUser();
  }, [token]);

  return (
    <>
      <h1>Account</h1>
      <p>
        <b>First Name: </b>
        {user?.firstname}
      </p>
      <p>
        <b>Last Name: </b>
        {user?.lastname}
      </p>
      <p>
        <b>Email: </b>
        {user?.email}
      </p>
      <h2>Reservations:</h2>
      <ul className="book-list">
        {reservations.map((reservation) => (
          <ReservationListItem key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </>
  );
}

function ReservationListItem({ reservation }) {
  const [error, setError] = useState(null);
  const { returnBook } = useReservations();

  const tryReturnBook = async () => {
    setError(null);
    try {
      await returnBook(reservation.id);
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <li className="book">
      <figure>
        <img
          src={reservation.coverimage}
          alt={"Cover of " + reservation.title}
        />
      </figure>
      <div>
        <h2>{reservation.title}</h2>
        <p className="author">{reservation.author}</p>
        <button onClick={() => tryReturnBook()}>Remove</button>
        {error && <p role="alert">{error}</p>}
      </div>
    </li>
  );
}
