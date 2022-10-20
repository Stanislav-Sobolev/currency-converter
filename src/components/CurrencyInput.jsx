import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export const CurrencyInput = ({
  amount1,
  amount2,
  currencies,
  onCurrencyChange,
  onAmountChange,
}) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        name="input1"
        value={amount1}
        onChange={e => onAmountChange(e)}
      />

      <Select
        defaultValue={currencies[0]}
        name="select1"
        onChange={onCurrencyChange}
      >
        {currencies.map(currency => (
          <MenuItem value={currency} key={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
      <div>
        {/* <select name="select1" onChange={onCurrencyChange}>
          {currencies.map(currency => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select> */}
      </div>
      <div>
        <input
          type="text"
          name="input2"
          value={amount2}
          onChange={e => onAmountChange(e)}
        />
        <select name="select2" onChange={onCurrencyChange}>
          {currencies.map(currency => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
