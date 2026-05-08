import { useState, useEffect } from "react";
import { mockBookDetails } from "../utils/mockBookDetails.js";

export function useBook(bookId) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    let fallbackTimer;

    if (!bookId) {
      setLoading(false);
      setError("ID de libro no valido");
      return undefined;
    }

    const fetchBook = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://localhost:8080/api/v1/books/${bookId}`);

        if (!response.ok) {
          throw new Error("Error al cargar el libro del servidor");
        }

        const data = await response.json();
        if (isActive) {
          setBook(data);
          setLoading(false);
        }
      } catch (err) {
        console.log("Error en peticion HTTP:", err.message);
        console.log("Cargando datos de respaldo para libro ID:", bookId);

        fallbackTimer = setTimeout(() => {
          if (!isActive) return;
          const bookData = mockBookDetails[bookId];
          if (bookData) {
            setBook(bookData);
            setError("Datos cargados desde cache local");
          } else {
            setError("Libro no encontrado");
          }
          setLoading(false);
        }, 500);
      }
    };

    fetchBook();

    return () => {
      isActive = false;
      clearTimeout(fallbackTimer);
    };
  }, [bookId]);

  return { book, loading, error };
}
