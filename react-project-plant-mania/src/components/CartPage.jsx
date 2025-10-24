import React from "react";
import "../css/CartPage.css";

function CartPage({ cart, removeFromCart, isOpen, onClose }) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>

      <div className="cart-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5>Your Cart</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      <div className="cart-body p-3">
        {cart.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item d-flex align-items-center mb-3 border p-2 rounded">
              <img src={item.image} alt={item.name} className="cart-item-image me-3" />
              <div className="flex-grow-1">
                <h6 className="mb-1">{item.name}</h6>
                <p className="mb-0 small">Price: KES {item.price}</p>
                <p className="mb-0 small">Quantity: {item.quantity || 1}</p>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer p-3 border-top d-flex justify-content-between">
        <h6>Total:</h6>
        <h6>KES {totalPrice}</h6>
      </div>
    </div>
  );
}

export default CartPage;
