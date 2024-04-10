import { createSlice } from "@reduxjs/toolkit";

type InitialState = {};

const initialState: InitialState = {};

const slice = createSlice({
  name: "root",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // builder.addCase();
  }
});

export const { reducer } = slice;
