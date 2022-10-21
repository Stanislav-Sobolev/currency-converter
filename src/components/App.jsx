import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { HeaderRate } from './HeaderRate';
import { useState, useEffect } from 'react';
import { CurrencyField } from './CurrencyField';

export const App = () => {
  const currencies = ['UAH', 'USD', 'EUR'];
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState(currencies[0]);
  const [currency2, setCurrency2] = useState(currencies[1]);
  const [rateUahUsd, setRateUahUsd] = useState(1);
  const [rateUahEur, setRateUahEur] = useState(1);
  const [rateUsdEur, setRateUsdEur] = useState(1);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const uahUsdRequest = axios.get(
      'https://v6.exchangerate-api.com/v6/c5e8098cd1188ac201840e77/pair/UAH/USD'
    );
    const uahEurRequest = axios.get(
      'https://v6.exchangerate-api.com/v6/c5e8098cd1188ac201840e77/pair/UAH/EUR'
    );
    const usdEurRequest = axios.get(
      'https://v6.exchangerate-api.com/v6/c5e8098cd1188ac201840e77/pair/USD/EUR'
    );

    axios
      .all([uahUsdRequest, uahEurRequest, usdEurRequest])
      .then(responses => {
        const responseUahUsd = responses[0].data.conversion_rate;
        const responseUahEur = responses[1].data.conversion_rate;
        const responesUsdEur = responses[2].data.conversion_rate;

        setRateUahUsd(responseUahUsd);
        setRateUahEur(responseUahEur);
        setRateUsdEur(responesUsdEur);
      })
      .catch(error => console.log('error', error));
  }, []);

  useEffect(() => {
    switch (currency1 + currency2) {
      case 'UAH' + 'USD':
        setRate(rateUahUsd);
        break;
      case 'UAH' + 'EUR':
        setRate(rateUahEur);
        break;
      case 'EUR' + 'UAH':
        setRate((1 / rateUahEur).toFixed(5));
        break;
      case 'EUR' + 'USD':
        setRate((1 / rateUsdEur).toFixed(5));
        break;
      case 'USD' + 'UAH':
        setRate((1 / rateUahUsd).toFixed(5));
        break;
      case 'USD' + 'EUR':
        setRate(rateUsdEur);
        break;
      case 'USD' + 'USD':
      case 'EUR' + 'EUR':
      case 'UAH' + 'UAH':
        setRate(1);
        break;
      default:
        break;
    }
  }, [currency1, currency2, rateUahEur, rateUahUsd, rateUsdEur]);

  useEffect(() => {
    if (rate) {
      setAmount1(prev => {
        setAmount2(prev * rate);

        return prev;
      });
    }
  }, [rate]);

  function handleCurrencyChange(e) {
    const selector = e.target.name;
    const { value } = e.target;
    if (selector === '1') {
      setAmount2(amount1 * rate);
      setCurrency1(value);
    } else {
      setCurrency2(value);
    }
  }

  function handleAmountChange(e) {
    const selector = e.target.name;
    const value = e.target.value.trim();

    if (value === '') {
      setAmount1('');
      setAmount2('');
      return;
    }

    if (selector === '1') {
      setAmount2(Number.parseFloat((value * rate).toFixed(2)));
      setAmount1(Number(value));
    } else {
      setAmount1(Number.parseFloat((value / rate).toFixed(2)));
      setAmount2(Number(value));
    }
  }

  return (
    <>
      <div className="header">
        <HeaderRate
          className="headerRate"
          rateUahUsd={rateUahUsd}
          rateUahEur={rateUahEur}
        />
      </div>

      <div className="carrencyFieldWrapper">
        <CurrencyField
          numberField="1"
          defaultCurrency={currencies[0]}
          currencies={currencies}
          amount={amount1}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
        <CurrencyField
          numberField="2"
          defaultCurrency={currencies[1]}
          currencies={currencies}
          amount={amount2}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
      </div>
    </>
  );
};

CurrencyField.propTypes = {
  numberField: PropTypes.string,
  defaultCurrency: PropTypes.string,
  currencies: PropTypes.array,
  amount: PropTypes.number,
  onCurrencyChange: PropTypes.func,
  onAmountChange: PropTypes.func,
};

HeaderRate.propTypes = {
  className: PropTypes.string,
  rateUahUsd: PropTypes.number,
  rateUahEur: PropTypes.number,
};
