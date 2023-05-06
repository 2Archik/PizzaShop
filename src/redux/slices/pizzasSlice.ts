import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

interface PizzaSliceState {
  items: Pizza[];
}

const initialState: PizzaSliceState = {
  items: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const selectPizzaData = (state: RootState) => state.pizza.items;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
