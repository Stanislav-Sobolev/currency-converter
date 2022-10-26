import { useSelector } from 'react-redux';

export const useAllSelectors = () => {
  const headerRate1 = useSelector(state => state.currency.savedRates['UAHUSD']);
  const headerRate2 = useSelector(state => state.currency.savedRates['UAHEUR']);
  const headerCurrencies = useSelector(
    state => state.currency.headerCurrencies
  );

  const currency1 = useSelector(state => state.currency.currency1);
  const currency2 = useSelector(state => state.currency.currency2);
  const defaultCurrency1 = useSelector(
    state => state.currency.defaultCurrency1
  );
  const defaultCurrency2 = useSelector(
    state => state.currency.defaultCurrency2
  );
  const rate = useSelector(state => state.currency.rate);
  const supportedCurrencies = useSelector(
    state => state.currency.supportedCurrencies
  );
  const pending = useSelector(state => state.currency.pending);
  const error = useSelector(state => state.currency.error);

  return {
    headerRate1,
    headerRate2,
    headerCurrencies,
    currency1,
    currency2,
    defaultCurrency1,
    defaultCurrency2,
    rate,
    supportedCurrencies,
    pending,
    error,
  };
};
