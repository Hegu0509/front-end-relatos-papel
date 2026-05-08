import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/global/GlobalContext.jsx";
import "./Checkout.css";

export default function Checkout() {
  const { cart, setCart } = useContext(GlobalContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const handlePayment = () => {
    window.alert("Pedido realizado satisfactoriamente");
    setCart([]);
    navigate("/books");
  };

  if (cart.length === 0) {
    return (
      <section className="checkout empty-checkout">
        <div>
          <p className="section-kicker">Checkout</p>
          <h1>Tu carrito esta vacio</h1>
          <p>Agrega libros desde la vista de detalle para continuar con tu compra.</p>
          <Link className="primary-link" to="/books">Explorar catalogo</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="checkout-header">
        <p className="section-kicker">Compra segura</p>
        <h1>Resumen del pedido</h1>
        <p>Revisa los libros seleccionados antes de confirmar el pago.</p>
      </div>

      <div className="checkout-layout">
        <div className="checkout-items">
          {cart.map((item) => (
            <article key={item.id} className="checkout-item">
              <div>
                <h3>{item.title}</h3>
                <p>Cantidad: {item.quantity}</p>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </article>
          ))}
        </div>

        <aside className="checkout-summary">
          <h2>Total de compra</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Envio digital</span>
            <strong>Gratis</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="checkout-pay-btn" onClick={handlePayment}>
            Confirmar pago
          </button>
          <Link className="secondary-link" to="/books">Seguir comprando</Link>
        </aside>
      </div>
    </section>
  );
}
