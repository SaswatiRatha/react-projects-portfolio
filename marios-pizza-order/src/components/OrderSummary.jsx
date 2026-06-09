import { useSelector } from "react-redux";
import { basePrice, sidesPrice, toppingsPrice, total } from "../store/selectors/totalSelectors";

export default function OrderSummary() {
  const customerData = useSelector((state) => state.pizza.customerData);
  const pizzaType = useSelector((state) => state.pizza.pizzaType);

  const sideCrustPrice = useSelector(basePrice);
  const toppingPrice = useSelector(toppingsPrice);
  const sidePrice = useSelector(sidesPrice);
  const totalPrice = useSelector(total);

  return (
    <section>
      <h2 className="section-heading">Your current selection</h2>
      <div className="summary">
        <div className="individual-summary">
          <div className="pizza-name">
            <h3>{`${pizzaType.size} Pizza `}</h3>
            <p>({pizzaType.crust})</p>
          </div>
          <p className="summary-price">₹{sideCrustPrice}</p>
        </div>

        {pizzaType.toppings.length > 0 ? (
          <div className="individual-summary">
            <p className="toppings">
              <strong>Toppings: </strong>
              {pizzaType.toppings.join(", ")}
            </p>

            <p className="summary-price">+ ₹{toppingPrice}</p>
          </div>
        ) : (
          ""
        )}

        {pizzaType.sides.length > 0 ? (
          <div className="individual-summary">
            <p>
              <strong>Sides: </strong>
              {pizzaType.sides.join(", ")}
            </p>
            <p className="summary-price">+ ₹{sidePrice}</p>
          </div>
        ) : (
          ""
        )}

      </div>
      <div className="individual-summary">
        <h3>Amount</h3>
        <p className="summary-price">₹{totalPrice}</p>
      </div>
      {customerData.name !== "" && customerData.isDelivery ? (
        <div className="customer-summary">
          <h3>Customer Information</h3>
          <div className="customer-details">
            <p>
              <strong>Customer name: </strong>
              {customerData.name}
            </p>
            <p>
              <strong>Phone: </strong>
              {customerData.phone}
            </p>
            <p>
              <strong>Address: </strong>
              {customerData.address}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
