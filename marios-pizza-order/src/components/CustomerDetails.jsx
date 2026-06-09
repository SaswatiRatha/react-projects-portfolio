import { useDispatch, useSelector } from "react-redux";
import { setCustomer, setError, validateCustomerDetails } from "../store/slice/pizzaSlice";

export default function CustomerDetails({nameRef,emailRef,phoneRef,addressRef}){

    const customerData = useSelector(state=> state.pizza.customerData);
    const currentErrors = useSelector(state=> state.pizza.currentErrors);

    console.log(currentErrors.customerError);
    

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const {name,value} = e.target;

        dispatch(setCustomer({name,value}));
        dispatch(setError({
            ...currentErrors,
            [name]: "",
        }));
    }    

    const checkValidation = (e) => {
        const { name } = e.target;
        const errors = validateCustomerDetails(customerData);

        dispatch(setError({
            ...currentErrors,
            [name]: errors[name] || "",
        }));
    };

    return(
        <div>
            <h2 className="section-heading">Customer details</h2>
            <div className="form-group" ref={nameRef}>
            <label htmlFor="name">Full Name</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={customerData.name}
                onChange={handleInputChange}
                onBlur={checkValidation}
                className={currentErrors.name ? "error" : ""}
            />
            {currentErrors.name && (
                <span>{currentErrors.name}</span>
            )}
            </div>
            <div className="form-group" ref={emailRef}>
            <label htmlFor="email">Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={customerData.email}
                onChange={handleInputChange}
                onBlur={checkValidation}
                className={currentErrors.email ? "error" : ""}
            />
            {currentErrors.email && (
                <span>{currentErrors.email}</span>
            )}
            </div>
            <div className="form-group" ref={phoneRef}>
            <label htmlFor="phone">Phone Number</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91 999 999 9999"
                value={customerData.phone}
                onChange={handleInputChange}
                onBlur={checkValidation}
                className={currentErrors.phone ? "error" : ""}
            />
            {currentErrors.phone && (
                <span>{currentErrors.phone}</span>
            )}
            </div>
            <div className="form-group">
            <fieldset>
                <legend>Order type</legend>
                <div className="radio-group">
                <label htmlFor="orderType">
                    <input
                    type="radio"
                    id="orderType"
                    name="orderType"
                    value="true"
                    checked={customerData.isDelivery === true}
                    onChange={()=> dispatch(setCustomer({name: "isDelivery",value: true}))}
                    />
                    Delivery (45-60 minutes)
                </label>
                <label htmlFor="orderType">
                    <input
                    type="radio"
                    id="orderType"
                    name="orderType"
                    value="false"
                    checked={customerData.isDelivery === false}
                    onChange={()=> dispatch(setCustomer({name: "isDelivery",value: false}))}
                    />
                    Pickup (25-30 minutes)
                </label>
                </div>
            </fieldset>
            </div>
            {customerData.isDelivery && (
            <div className="form-group" ref={addressRef}>
                <label htmlFor="address">Delivery Address:</label>
                <textarea
                id="address"
                name="address"
                rows="4"
                placeholder="Enter your address"
                value={customerData.address}
                onChange={handleInputChange}
                className={currentErrors.address ? "error" : ""}
                onBlur={checkValidation}
                />
                {currentErrors.address && (
                <span>{currentErrors.address}</span>
                )}
            </div>
            )}
        </div>
    )
}