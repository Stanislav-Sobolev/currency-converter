import { createSlice } from '@reduxjs/toolkit';
import currencyOperations from './currencyOperations';

const initialState = {
  headerCurrency1: 'USD',
  headerCurrency2: 'EUR',
  headerCurrencies: ['USD', 'EUR'],
  defaultCurrency1: 'UAH',
  defaultCurrency2: 'USD',
  currency1: 'UAH',
  currency2: 'USD',
  rate: '',
  savedRates: {},
  supportedCurrencies: ['UAH', 'USD', 'EUR', 'GBP'], // Add more currencies here
  pending: false,
  error: '',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurrency1: (state, action) => {
      state.currency1 = action.payload;
    },
    changeCurrency2: (state, action) => {
      state.currency2 = action.payload;
    },
  },
  extraReducers: {
    [currencyOperations.getRateApi.fulfilled](state, action) {
      const isNewRate = action.payload.fetchedRates;
      if (isNewRate) {
        state.savedRates[isNewRate] = action.payload.rate;
      }
      state.rate = action.payload.rate;
      state.pending = false;
    },

    [currencyOperations.getHeaderRateApi.fulfilled](state, action) {
      const isNewRate = action.payload.fetchedRates;
      if (isNewRate) {
        state.savedRates[isNewRate] = action.payload.rate;
      }
      state.pending = false;
    },

    [currencyOperations.getRateApi.pending](state) {
      state.pending = true;
    },
    [currencyOperations.getRateApi.rejected](state, action) {
      state.error = action.payload;
      state.pending = false;
    },
    [currencyOperations.getHeaderRateApi.pending](state) {
      state.pending = true;
    },
    [currencyOperations.getHeaderRateApi.rejected](state, action) {
      state.error = action.payload;
      state.pending = false;
    },
  },
});

export const { changeCurrency1, changeCurrency2 } = currencySlice.actions;
