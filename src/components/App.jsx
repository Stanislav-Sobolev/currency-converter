import React from 'react';
import { HeaderRate } from './HeaderRate';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CurrencyField } from './CurrencyField';

export const App = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('UAH');
  const [currency2, setCurrency2] = useState('UAH');
  const currencies = ['UAH', 'USD', 'EUR'];
  const [rateUahUsd, setRateUahUsd] = useState('');
  const [rateUahEur, setRateUahEur] = useState('');
  const [rateUsdEur, setRateUsdEur] = useState('');
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
    console.log('0');
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
    console.log('1');
  }, [currency1, currency2, rateUahEur, rateUahUsd, rateUsdEur]);

  useEffect(() => {
    if (rate) {
      setAmount2(1 * rate);
      setAmount1(1);
    }
    console.log('2');
  }, [rate]);

  function handleCurrencyChange(e) {
    const selector = e.target.name;
    const { value } = e.target;
    if (selector === '1') {
      setAmount2(amount1 * rate);
      setCurrency1(value);
      console.log('3_1');
    } else {
      setCurrency2(value);
      console.log('3_2');
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
      setAmount1(value);
      console.log('4_1');
    } else {
      setAmount1(Number.parseFloat((value / rate).toFixed(2)));
      setAmount2(value);
      console.log('4_2');
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
          currencies={currencies}
          amount={amount1}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
        <CurrencyField
          numberField="2"
          currencies={currencies}
          amount={amount2}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
      </div>
    </>
  );
};
