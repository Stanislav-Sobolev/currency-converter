import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const apiKey = 'c5e8098cd1188ac201840e77';
axios.defaults.baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;

const getRateApi = createAsyncThunk(
  'currency/getRateApi',
  async (credentials, thunkAPI) => {
    try {
      const { from, to } = credentials;
      const savedRates = thunkAPI.getState().currency.savedRates;
      const fetchedRates = from + to;

      if (savedRates[fetchedRates]) {
        return { rate: savedRates[fetchedRates] };
      }

      const { data } = await axios.get(`/${from}/${to}`);
      return { rate: data.conversion_rate, fetchedRates };
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getHeaderRateApi = createAsyncThunk(
  'currency/getHeaderRateApi',
  async (credentials, thunkAPI) => {
    try {
      const { from, to } = credentials;
      const savedRates = thunkAPI.getState().currency.savedRates;
      const fetchedRates = from + to;

      if (savedRates[fetchedRates]) {
        return { rate: savedRates[fetchedRates] };
      }

      const { data } = await axios.get(`/${from}/${to}`);
      return { rate: data.conversion_rate, fetchedRates };
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const currencyOperations = {
  getRateApi,
  getHeaderRateApi,
};
export default currencyOperations;
