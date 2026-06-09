import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./slice/pizzaSlice";

export const store = configureStore({
    reducer: {
        pizza: pizzaReducer,
    }
});