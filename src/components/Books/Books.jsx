import React, { useContext, useMemo, useState } from "react";
import "./Books.css";
import { GlobalContext } from "../../context/global/GlobalContext";
import { useBooks } from "../../hooks/useBooks.js";
import { Link } from "react-router-dom";

export default function Books() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { searchTerm } = useContext(GlobalContext);
  const { books, loading, error: fetchError } = useBooks();

  const filteredBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return books;
    return books.filter((book) => book.title.toLowerCase().includes(term));
  }, [books, searchTerm]);

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleChange(e) {
    const value = e.target.value;
    setEmail(value);
    setError(value === "" || validateEmail(value) ? "" : "Introduce un correo electronico valido.");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Introduce un correo electronico valido.");
      return;
    }
    window.alert("Suscripcion registrada correctamente");
    setEmail("");
    setError("");
  }

  return (
    <div className="books">
      <section className="books-section">
        <div className="section-heading">
          <p className="section-kicker">Catalogo</p>
          <h2>Libros disponibles</h2>
          <p>Explora la seleccion de Relatos de Papel. La compra se inicia desde el detalle de cada libro.</p>
        </div>

        {loading && <p className="loading-message">Cargando libros...</p>}

        {!loading && filteredBooks.length === 0 && (
          <div className="empty-results">
            <h3>No encontramos libros para "{searchTerm}"</h3>
            <p>Prueba con otro titulo o limpia la busqueda.</p>
          </div>
        )}

        {!loading && filteredBooks.length > 0 && (
          <div className="books-grid">
            {filteredBooks.map((book) => (
              <article key={book.id} className="book-card">
                <div className="cover-image">
                  <img
                    src={book.cover}
                    alt={book.title}
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23999' font-family='Arial' font-size='16'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                <div className="book-card-body">
                  <div className="book-header">
                    <h3 className="book-name">{book.title}</h3>
                    <span className="book-type">{book.format}</span>
                  </div>
                  <p className="book-description">{book.shortDescription}</p>
                  <div className="book-footer">
                    <span className="product-price">${book.price}</span>
                  </div>
                  <div className="book-actions">
                    <Link to={`/books/${book.id}`} className="view-detail-btn">
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="newsletter-section">
        <div>
          <p className="section-kicker">Novedades</p>
          <h2>Newsletter</h2>
          <p>Recibe lanzamientos, recomendaciones y ofertas de libros seleccionados.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="newsletter-email">Correo electronico</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={handleChange}
          />
          <button type="submit">Suscribirme</button>
          <p className="newsletter-error">{error}</p>
        </form>
      </section>
    </div>
  );
}
