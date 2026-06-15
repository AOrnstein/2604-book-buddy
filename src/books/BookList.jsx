import { Link } from "react-router";
import { getBooks } from "../api/books";
import { useEffect, useState } from "react";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const syncBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };

    syncBooks();
  }, []);

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
}

function BookListItem({ book }) {
  return (
    <li className="book">
      <figure>
        <img src={book.coverimage} alt={"Cover of " + book.title} />
      </figure>
      <div>
        <h2>
          <Link to={"/books/" + book.id}>{book.title}</Link>
        </h2>
        <p className="author">{book.author}</p>
        <p>{book.description}</p>
      </div>
    </li>
  );
}
