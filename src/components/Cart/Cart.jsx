import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/global/GlobalContext";
import "./Cart.css";

const Cart = () => {
  const { cart, showCart, setShowCart, removeFromCart, updateQuantity, darkMode } = useContext(GlobalContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  if (!showCart) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const goToCheckout = () => {
    setShowConfirm(false);
    setShowCart(false);
    navigate("/checkout");
  };

  return (
    <div className="cart-overlay" onClick={() => setShowCart(false)}>
      <div className={`cart-modal ${darkMode ? "dark" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div>
            <p className="section-kicker">Carrito</p>
            <h2>Tu seleccion</h2>
          </div>
          <button className="close-btn" onClick={() => setShowCart(false)} aria-label="Cerrar carrito">x</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart-message">El carrito esta vacio</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
                <div className="item-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Restar unidad">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Sumar unidad">+</button>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="total">Total: ${total.toFixed(2)}</div>
            <button className="checkout-btn" onClick={() => setShowConfirm(true)}>Proceder al pago</button>
          </div>
        )}
      </div>
      {showConfirm && (
        <div className="confirm-popup" onClick={(e) => e.stopPropagation()}>
          <div className="confirm-content">
            <p>Quieres revisar el resumen de compra?</p>
            <div className="confirm-buttons">
              <button onClick={goToCheckout}>Ir a checkout</button>
              <button onClick={() => setShowConfirm(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
