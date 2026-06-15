import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router";
import { getBook } from "../api/books";
import { useReservations } from "../contexts/ReservationsContext";

export default function BookDetailPage() {
  const { token } = useAuth();
  const { reservations, reserveBook } = useReservations();
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };

    syncBook();
  }, [id, token, reservations]);

  const tryReserve = async () => {
    setError(null);
    try {
      await reserveBook(id);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <article className="book">
      <figure>
        <img
          src={book?.coverimage}
          alt={book ? "Cover of " + book.title : "placeholder"}
        />
      </figure>
      <div>
        <h1>{book?.title}</h1>
        <p className="author">{book?.author}</p>
        <p>{book?.description}</p>
        {token && (
          <button onClick={() => tryReserve()} disabled={!book?.available}>
            Reserve
          </button>
        )}
        {error && <p role="alert">{error}</p>}
      </div>
    </article>
  );
}
