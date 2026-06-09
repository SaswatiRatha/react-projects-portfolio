import { useDispatch, useSelector } from "react-redux";
import {  clearCart, resetForm, resetPizzaSelection, setSuccess, toggleCart } from "../store/slice/pizzaSlice";
import { cartTotal, itemTotal } from "../store/selectors/totalSelectors";

export default function Cart() {
  const dispatch = useDispatch();

  const pizzaType = useSelector(state=> state.pizza.pizzaType);
  const cart = useSelector(state => state.pizza.cart.items);
  const sides = useSelector(state => state.pizza.pizzaType.sides);
  const itemTotalPrice = useSelector(itemTotal);
  const cartTotalPrice = useSelector(cartTotal);
  const customerData = useSelector(state => state.pizza.customerData);

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(resetPizzaSelection());
  };

  const handleCheckout = () => {
    const orderData = {
      customer: customerData,
      pizza: pizzaType,
      total: cartTotalPrice,
      orderTime: new Date().toISOString(),
      estimatedDelivery: customerData.isDelivery ? '45-60 minutes' : '25-30 minutes',
    }
    
    const orderSummary = `
      Your order has been successfully placed!

      Order Id: #${Math.floor(Math.random()*10000)}
      Customer Name: ${customerData.name}
      Email: ${customerData.email}
      Phone: ${customerData.phone}

      ${customerData.isDelivery ? `Your order will be delivered in 45-60 minutes to ${customerData.address}` : `Your order will be ready for pickup from Mario's Pizza in 25-30 minutes`}

      Total Amount: ₹${cartTotalPrice}

      Thank you!!
    `;

    dispatch(setSuccess())
    console.log(orderData);

    alert(orderSummary);
    dispatch(clearCart());
    dispatch(resetForm());
  }


  return (
    <div className="cart-card">
      <button onClick={()=>dispatch(toggleCart())} className="close-btn">x</button>
      <h2 className="cart-header">Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-items">
              <div className="cart-detail">
                <h4>
                  {item.size} Pizza ({item.crust})
                </h4>
                <p>Toppings: {item.toppings.join(", ")}</p>
                {sides.length !== 0 ? (<p>Sides: {item.sides}</p>) : ""}
              </div>
              <div className="cart-amount">
                <p>₹{item.total}</p>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <div className="individual-summary">
              <p>Item total:</p>
              <p>₹{itemTotalPrice}</p>
            </div>
            {customerData.isDelivery ? (
              <div className="individual-summary">
                <p>Delivery Charges </p>
                <p className="summary-price">
                  {customerData.isDelivery ? `+ ₹15` : ""}
                </p>
              </div>
            ) : (
              ""
            )}
            <div className="individual-summary total-amount">
              <p>Total Amount:</p>
              <p>₹{cartTotalPrice}</p>
            </div>
          </div>
          
          <div className="button-group">
            <button
              type="button"
              className="clear-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button 
              className="submit-btn" 
              type="submit"
              onClick={handleCheckout}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
