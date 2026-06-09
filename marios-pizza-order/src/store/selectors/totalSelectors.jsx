import { createSelector } from "@reduxjs/toolkit";

const pizzaSize = (state) => state.pizza.pizzaType.size;
const pizzaCrust = (state) => state.pizza.pizzaType.crust;
const pizzaToppings = (state) => state.pizza.pizzaType.toppings;
const pizzaSides = (state) => state.pizza.pizzaType.sides;
const pizzaQuantity = (state) => state.pizza.pizzaType.quantity;
const pizzaIsDelivery = (state) => state.pizza.customerData.isDelivery;
const pizzaPrice = (state) => state.pizza.cart.items;

const sizePrices = { 
    Small: 199, 
    Medium: 399, 
    Large: 599 };

const crustPrices = {
  "New Hand Tossed": 0,
  "Classic Hand Tossed": 0,
  "Wheat Thin Crust": 50,
  "Fresh Pan Pizza": 50,
  "Cheese Burst": 100,
};

const toppingList = [
  { name: "Black Olive", price: 35 },
  { name: "Grilled Mushrooms", price: 35 },
  { name: "Onion", price: 35 },
  { name: "Paneer", price: 35 },
  { name: "Jalapeno", price: 35 },
  { name: "Peri - Peri Chicken", price: 50 },
  { name: "Chicken Tikka", price: 50 },
  { name: "Chicken Pepperoni", price: 50 },
];

const sideList = [
  { name: "Coca Cola", price: 70 },
  { name: "Thumbs Up", price: 70 },
  { name: "Garlic Bread", price: 109 },
  { name: "Stuffed Garlic Bread", price: 129 },
  { name: "Chocolava Cake", price: 99 },
  { name: "Mousse Cake", price: 109 },
];

export const basePrice = createSelector(
    [pizzaSize, pizzaCrust],
    (side, crust) => {
        const sizePrice = sizePrices[side];
        const crustPrice = crustPrices[crust]; 
        return (sizePrice + crustPrice);
    }

)

export const toppingsPrice = createSelector(
    [pizzaToppings],
    (toppings) => toppings.reduce((total, toppingName) => {
        const topping = toppingList.find((item) => item.name === toppingName);
    return total + (topping ? topping.price : 0);
  }, 0)
);

export const sidesPrice = createSelector(
    [pizzaSides],
    (sides) => sides.reduce((total, sideName) => {
        const side = sideList.find((item) => item.name === sideName);
        return total + (side ? side.price : 0);
  }, 0)
);

export const total = createSelector(
    [basePrice, toppingsPrice, sidesPrice, pizzaQuantity],
    (base, toppingPrice, sidePrice, quantity) => {
        return (base + toppingPrice + sidePrice) * quantity;
    }
);

export const itemTotal = createSelector(
    [pizzaPrice],
    (eachPizzaPrice) => {
        return (eachPizzaPrice.reduce((sum,item)=>sum+item.total,0));
    }
);

export const cartTotal = createSelector(
    [pizzaIsDelivery,itemTotal],
    (isDelivery,totalPizzaPrice) => {
        const deliveryCharge = isDelivery ? 15 : 0;
        return (totalPizzaPrice + deliveryCharge);
    }
);

