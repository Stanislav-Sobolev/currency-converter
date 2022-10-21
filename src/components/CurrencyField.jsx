import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export const CurrencyField = ({
  numberField,
  amount,
  currencies,
  onCurrencyChange,
  onAmountChange,
}) => {
  return (
    <div>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        name={numberField}
        value={amount}
        onChange={e => onAmountChange(e)}
      />

      <Select
        defaultValue={currencies[0]}
        name={numberField}
        onChange={onCurrencyChange}
      >
        {currencies.map(currency => (
          <MenuItem value={currency} key={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
