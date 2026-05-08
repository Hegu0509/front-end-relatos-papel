import { useState, useEffect } from "react";
import { mockBooks } from "../utils/mockBooks.js";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    let fallbackTimer;

    const fetchBooks = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/books");

        if (!response.ok) {
          throw new Error("Error al cargar libros del servidor");
        }

        const data = await response.json();
        if (isActive) {
          setBooks(data.books);
          setLoading(false);
        }
      } catch (err) {
        console.log("Error en peticion HTTP:", err.message);
        console.log("Cargando datos de respaldo...");

        fallbackTimer = setTimeout(() => {
          if (!isActive) return;
          setBooks(mockBooks);
          setLoading(false);
        }, 600);
      }
    };

    fetchBooks();

    return () => {
      isActive = false;
      clearTimeout(fallbackTimer);
    };
  }, []);

  return { books, loading};
}
