import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useAllSelectors } from '../hooks/useAllSelectors';

export const CurrencyField = ({
  numberField,
  defaultCurrency,
  amount,
  onCurrencyChange,
  onAmountChange,
}) => {
  const { supportedCurrencies, rate } = useAllSelectors();

  return (
    <div>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        name={numberField}
        value={rate && amount}
        onChange={e => onAmountChange(e)}
      />

      <Select
        defaultValue={defaultCurrency}
        name={numberField}
        onChange={onCurrencyChange}
      >
        {supportedCurrencies.map(currency => (
          <MenuItem value={currency} key={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
