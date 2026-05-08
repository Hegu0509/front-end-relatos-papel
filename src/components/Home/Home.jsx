import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <p className="section-kicker">Libreria online</p>
      <h1>Relatos de Papel</h1>
      <h2>Historias, tecnologia y conocimiento en un solo catalogo.</h2>
      <p>Bienvenido a la plataforma de libros digitales y fisicos para lectores, estudiantes y equipos profesionales.</p>
      <p>Explora el catalogo, revisa el detalle de cada libro y crea tu pedido desde una experiencia de compra simple.</p>

      <div className="home-features">
        <div className="feature-card">
          <h3>Catalogo curado</h3>
          <p>Libros seleccionados para aprendizaje, desarrollo profesional y cultura digital.</p>
        </div>
        <div className="feature-card">
          <h3>Compra guiada</h3>
          <p>Consulta detalles, autores, categorias y disponibilidad antes de agregar al carrito.</p>
        </div>
        <div className="feature-card">
          <h3>Perfil protegido</h3>
          <p>Acceso privado para revisar datos del usuario y los ultimos pedidos realizados.</p>
        </div>
      </div>
    </div>
  );
}
