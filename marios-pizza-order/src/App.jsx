import { useRef } from "react";
import "./App.css";
import CustomerDetails from "./components/CustomerDetails";
import { useDispatch, useSelector } from "react-redux";
import { total } from "./store/selectors/totalSelectors";
import PizzaSelection from "./components/PizzaSelection";
import OrderSummary from "./components/OrderSummary";
import { addToCart, resetForm, resetPizzaSelection, setError, setToppingError, toggleCart, validateCustomerDetails } from "./store/slice/pizzaSlice";
import Cart from "./components/Cart";
import cartIcon from "./assets/cart.png"

export default function App() {
  
  const customerData = useSelector(state=> state.pizza.customerData);
  const pizzaType = useSelector(state=> state.pizza.pizzaType);
  const toppings = useSelector(state=> state.pizza.pizzaType.toppings);
  const totalPrice = useSelector(total);
  const showCart = useSelector(state=> state.pizza.cart.isOpen);
  const cartItemCount = useSelector(state=> state.pizza.cart.itemCount);

  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const toppingRef = useRef(null);
  const clearRef = useRef(null);

  const validateToppings = () => {
    let error = "";
    if(toppings.length < 1){
      error = "Please select atleast 1 topping";
    }
    console.log(error);

    if(error === ""){
      return;
    } else{
      return error;
    }
  }

  const handleResetForm = () => {
    dispatch(resetForm());
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    const errors = validateCustomerDetails(customerData);
    const toppingError = validateToppings();
    dispatch(setError(errors));
    dispatch(setToppingError(toppingError));
    //console.log(errors)
    if (Object.keys(errors).length > 0) {
      if (errors.name) {
        nameRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (errors.email) {
        emailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (errors.phone) {
        phoneRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (errors.address) {
        addressRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }
    if(toppingError){
        toppingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
    }

    dispatch(addToCart({
      ...pizzaType,
      total: totalPrice,
    }));

    dispatch(resetPizzaSelection());

  
    clearRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
  }

  
  

  
  return (
    <div className="app">
      <div className="register-form" ref={clearRef}>
        <header>
          <h1>Mario's Pizza - Online Ordering</h1>
          <h3>Authentic Italiano Pizza Since 1988</h3>
          <button className="cart-btn" onClick={()=>dispatch(toggleCart())}><img src={cartIcon} alt="cart-icon" /><p className="cart-item-count">{cartItemCount}</p></button>
        </header>
        <div className="main-page">
          <form className="customer-form" onSubmit={handleFormSubmit}>
            <h1>Place your order</h1>
            <CustomerDetails nameRef={nameRef} emailRef={emailRef} phoneRef={phoneRef} addressRef={addressRef} />
            <PizzaSelection toppingRef={toppingRef} />
            <OrderSummary />
            <div className="button-group">
              <button
                type="button"
                onClick={handleResetForm}
                className="clear-btn"
              >
                Reset form
              </button>
              <button
                type="submit"
                className="submit-btn"
              >
                Add to cart
              </button>
            </div>
            
          </form>
          {showCart && (<Cart />)}      
          
        </div>
      </div>
    </div>
  );
}
