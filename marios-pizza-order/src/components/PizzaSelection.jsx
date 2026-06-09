import { useDispatch, useSelector } from "react-redux";
import { setPizzaType, setSides, setToppings } from "../store/slice/pizzaSlice";

export default function PizzaSelection({toppingRef}) {

  const pizzaType = useSelector(state => state.pizza.pizzaType);
  const toppings = useSelector(state=> state.pizza.toppings);
  const premiumToppings = useSelector(state=> state.pizza.premiumToppings);
  const sides = useSelector(state=> state.pizza.sides);
  const currQuantity = useSelector(state=> state.pizza.pizzaType.quantity);
  const currentErrors = useSelector(state=> state.pizza.toppingError);

  const dispatch = useDispatch();

  

  function handleInputToppings(event) {
    dispatch(setToppings(event.target.value));

  }

  function handleInputSides(event) {
    const { value, checked } = event.target;
    dispatch(setSides(value, checked));
    setPizzaType((prevData) => ({
      ...prevData,
      sides: checked
        ? [...prevData.sides, value]
        : prevData.sides.filter((item) => item !== value),
    }));
  }

  return (
    <section>
      <h2 className="section-heading">Customize your Pizza</h2>
      <div className="form-group">
        <label htmlFor="size">Pizza Size:</label>
        <div className="size-radio-group">
          <label
            className={`pizza-size ${
              pizzaType.size === "Small" ? "active-size" : ""
            }`}
          >
            <input
              type="radio"
              name="size"
              value="Small"
              checked={pizzaType.size === "Small"}
              onChange={()=>dispatch(setPizzaType({name: "size", value: "Small"}))}
            />
            <div className="radio-content">
              <h3>Small</h3>
              <p>Serves 1 person only</p>
            </div>
          </label>
          <label
            className={`pizza-size ${
              pizzaType.size === "Medium" ? "active-size" : ""
            }`}
          >
            <input
              type="radio"
              name="size"
              value="Medium"
              checked={pizzaType.size === "Medium"}
              onChange={()=>dispatch(setPizzaType({name: "size", value: "Medium"}))}
            />
            <div className="radio-content">
              <h3>Medium</h3>
              <p>Just right for 1-2 person</p>
            </div>
          </label>
          <label
            className={`pizza-size ${
              pizzaType.size === "Large" ? "active-size" : ""
            }`}
          >
            <input
              type="radio"
              name="size"
              value="Large"
              checked={pizzaType.size === "Large"}
              onChange={()=>dispatch(setPizzaType({name: "size", value: "Large"}))}
            />
            <div className="radio-content">
              <h3>Large</h3>
              <p>Perfect for 3-4 person</p>
            </div>
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="crust">Pizza Crust:</label>
        <div className="crust-checkbox-group">
          <label
            className={`pizza-crust ${
              pizzaType.crust === "New Hand Tossed" ? "active-crust" : ""
            }`}
          >
            <input
              type="checkbox"
              name="crust"
              id="crust"
              value="New Hand Tossed"
              checked={pizzaType.crust === "New Hand Tossed"}
              onChange={()=>dispatch(setPizzaType({name: "crust", value: "New Hand Tossed"}))}
            />
            <div className="checkbox-content">
              <h3>New Hand Tossed</h3>
              <h3>+ ₹0</h3>
            </div>
          </label>
          <label
            className={`pizza-crust ${
              pizzaType.crust === "Classic Hand Tossed" ? "active-crust" : ""
            }`}
          >
            <input
              type="checkbox"
              name="crust"
              id="crust"
              value="Classic Hand Tossed"
              checked={pizzaType.crust === "Classic Hand Tossed"}
              onChange={()=>dispatch(setPizzaType({name: "crust", value: "Classic Hand Tossed"}))}
            />
            <div className="checkbox-content">
              <h3>Classic Hand Tossed</h3>
              <h3>+ ₹0</h3>
            </div>
          </label>
          <label
            className={`pizza-crust ${
              pizzaType.crust === "Wheat Thin Crust" ? "active-crust" : ""
            }`}
          >
            <input
              type="checkbox"
              name="crust"
              id="crust"
              value="Wheat Thin Crust"
              checked={pizzaType.crust === "Wheat Thin Crust"}
              onChange={()=>dispatch(setPizzaType({name: "crust", value: "Wheat Thin Crust"}))}
            />
            <div className="checkbox-content">
              <h3>Wheat Thin Crust</h3>
              <h3>+ ₹50</h3>
            </div>
          </label>
          <label
            className={`pizza-crust ${
              pizzaType.crust === "Fresh Pan Pizza" ? "active-crust" : ""
            }`}
          >
            <input
              type="checkbox"
              name="crust"
              id="crust"
              value="Fresh Pan Pizza"
              checked={pizzaType.crust === "Fresh Pan Pizza"}
              onChange={()=>dispatch(setPizzaType({name: "crust", value: "Fresh Pan Pizza"}))}
            />
            <div className="checkbox-content">
              <h3>Fresh Pan Pizza</h3>
              <h3>+ ₹50</h3>
            </div>
          </label>
          <label
            className={`pizza-crust ${
              pizzaType.crust === "Cheese Burst" ? "active-crust" : ""
            }`}
          >
            <input
              type="checkbox"
              name="crust"
              id="crust"
              value="Cheese Burst"
              checked={pizzaType.crust === "Cheese Burst"}
              onChange={()=>dispatch(setPizzaType({name: "crust", value: "Cheese Burst"}))}
            />
            <div className="checkbox-content">
              <h3>Cheese Burst</h3>
              <h3>+ ₹100</h3>
            </div>
          </label>
        </div>
      </div>
      <div className="form-group">
        <fieldset className={currentErrors ? "error" : ""} ref={toppingRef}>
          <legend>Add Toppings:</legend>
          <div className="topping-checkbox-group">
            {toppings.map((topping) => (
              <label
                key={topping.name}
                className={`pizza-toppings ${
                  pizzaType.toppings.includes(topping.name)
                    ? "active-option"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="toppings"
                  id="toppings"
                  value={topping.name}
                  checked={pizzaType.toppings.includes(topping.name)}
                  onChange={handleInputToppings}
                />
                <div className="checkbox-topping">
                  <h3>{topping.name}</h3>
                  <h3>+ ₹{topping.price}</h3>
                </div>
              </label>

            ))}
          </div>
        </fieldset>
        {pizzaType.size === "Large" && (
          <fieldset className={currentErrors ? "error" : ""} ref={toppingRef}>
          <legend>Premium Toppings:</legend>
          <div className="topping-checkbox-group">
            {premiumToppings.map((topping) => (
              <label
                key={topping.name}
                className={`pizza-toppings ${
                  pizzaType.toppings.includes(topping.name)
                    ? "active-option"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="toppings"
                  id="toppings"
                  value={topping.name}
                  checked={pizzaType.toppings.includes(topping.name)}
                  onChange={handleInputToppings}
                />
                <div className="checkbox-topping">
                  <h3>{topping.name}</h3>
                  <h3>+ ₹{topping.price}</h3>
                </div>
              </label>

            ))}
          </div>
        </fieldset>
        )}
        {currentErrors && (
          <span>{currentErrors}</span>
        )}
      </div>
      <div className="form-group">
        <fieldset>
          <legend>Add Sides:</legend>
          <div className="sides-checkbox-group">
            {sides.map((side) => (
              <label
                key={side.name}
                className={`pizza-sides ${
                  pizzaType.sides.includes(side.name) ? "active-option" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="sides"
                  id="sides"
                  value={side.name}
                  checked={pizzaType.sides.includes(side.name)}
                  onChange={handleInputSides}
                />
                <div className="checkbox-sides">
                  <h3>{side.name}</h3>
                  <h3>+ ₹{side.price}</h3>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="form-group">
        <div className="quantity-section">
          <p>Quantity: </p>
          <div className="btn-section">
            <button
              type="button"
              className="quantity-btn"
              onClick={() => {if(currQuantity > 1){dispatch(setPizzaType({name: "quantity", value: currQuantity-1}))}}}
              disabled={currQuantity===1}
            >
              -
            </button>
            <p>{pizzaType.quantity}</p>
            <button
              type="button"
              className="quantity-btn"
              onClick={() =>dispatch(setPizzaType({name: "quantity", value: currQuantity+1}))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
}
