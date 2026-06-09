import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerData: {
    name: "",
    phone: "",
    email: "",
    address: "",
    isDelivery: true,
  },

  pizzaType: {
    size: "Small",
    crust: "New Hand Tossed",
    toppings: [],
    sides: [],
    quantity: 1,
    total: 199,
  },

  cart: {
    items: [],
    totalCartPrice: 0,
    isOpen: false,
    itemCount: null,
  },

  currentErrors: {},
  toppingError: "",
  isSubmitting: false,
  success: false,
  successMessage: "",

  toppings: [
    { name: "Black Olive", price: 35 },
    { name: "Onion", price: 35 },
    { name: "Corn", price: 35 },
    { name: "Jalapeno", price: 35 },
    { name: "Paneer", price: 35 },
    { name: "Chicken Barbeque", price: 50 },
  ],

  premiumToppings: [
    { name: "Grilled Mushrooms", price: 45 },
    { name: "Paneer Tikka", price: 45 },
    { name: "Peri - Peri Chicken", price: 60 },
    { name: "Chicken Pepperoni", price: 60 },
  ],

  sides: [
    { name: "Coca Cola", price: 70 },
    { name: "Thumbs Up", price: 70 },
    { name: "Garlic Bread", price: 109 },
    { name: "Stuffed Garlic Bread", price: 129 },
    { name: "Chocolava Cake", price: 99 },
    { name: "Mousse Cake", price: 109 },
  ],
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

export const validateCustomerDetails = (customerData) => {
  const newError = {};

  if (!customerData.name.trim()) {
    newError.name = "Please enter your name!";
  }

  if (!customerData.email) {
    newError.email = "Please enter your email address";
  } else if (!validateEmail(customerData.email)) {
    newError.email = "Invalid email adderess!";
  }

  if (!customerData.phone) {
    newError.phone = "Please enter your phone number!";
  } else if(!validatePhone(customerData.phone)){
    newError.phone = "Invalid phone number!"
  }

  if (customerData.isDelivery && !customerData.address.trim()) {
    newError.address = "Address is required for order delivery!";
  }

  return newError;
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      const { name, value } = action.payload;
      state.customerData[name] = value;
    },

    setError: (state, action) => {
      state.currentErrors = action.payload;
    },

    setToppingError: (state, action) => {
      state.toppingError = action.payload;
    },

    setPizzaType: (state, action) => {
      const { name, value } = action.payload;
      state.pizzaType[name] = value;
    },

    setToppings: (state, action) => {
      if (state.pizzaType.toppings.includes(action.payload)) {
        state.pizzaType.toppings=state.pizzaType.toppings.filter((item) => item !== action.payload);
      } else {
        state.pizzaType.toppings.push(action.payload);
      }
    },

    setSides: (state, action) => {
      if (state.pizzaType.sides.includes(action.payload)) {
        state.pizzaType.sides=state.pizzaType.sides.filter((item) => item !== action.payload);
      } else {
        state.pizzaType.sides.push(action.payload);
      }
    },

    resetPizzaSelection: (state) =>{
      state.pizzaType = {
        size: "Small",
        crust: "New Hand Tossed",
        toppings: [],
        sides: [],
        quantity: 1,
      };
    },

    toggleCart: (state) => {
      state.cart.isOpen= !state.cart.isOpen;
    },

    addToCart: (state,action) => {
        console.log("Adding to card pizza: ",action.payload);
        state.cart.items.push({
            id: Date.now(),
            ...action.payload
        });
        state.cart.itemCount += 1;
        
    },

    clearCart: (state) => {
      state.cart = {
        items: [],
        totalCartPrice: 0,
        isOpen: false,
        itemCount: null,
      }
    },

    removeFromCart: (state,action) => {
        state.cart = state.cart.filter(item=>item.id !== action.payload);
    },

    setSuccess: (state) => {
      state.success = true;
    },

    resetForm: (state) => {
      state.customerData= {
        name: "",
        phone: "",
        email: "",
        address: "",
        isDelivery: true,
      },

      state.pizzaType = {
        size: "Small",
        crust: "New Hand Tossed",
        toppings: [],
        sides: [],
        quantity: 1,
      };

      state.currentErrors = {};
      state.isSubmitting = false;
      state.success = false;
    },
  },
});

export const {
  setCustomer,
  setError,
  setToppingError,
  setPizzaType,
  setToppings,
  setSides,
  resetPizzaSelection,
  addToCart,
  clearCart,
  toggleCart,
  removeFromCart,
  setSuccess,
  resetForm,
} = pizzaSlice.actions;
export default pizzaSlice.reducer;
