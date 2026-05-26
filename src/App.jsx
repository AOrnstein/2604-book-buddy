import { Route, Routes } from "react-router";
import Error404 from "./Error404";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./layout/Layout";
import BooksPage from "./books/BooksPage";
import BookDetailPage from "./books/BookDetailPage";
import AccountPage from "./account/AccountPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BooksPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
