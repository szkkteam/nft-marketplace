import React from 'react';

import { TextField } from '@mui/material'


export interface NumberInputProps {
    onChange: (value: string) => void;
    value: string;
  }

const NumberInput = ({value, onChange}: NumberInputProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);        
      };

    return (
        <TextField
            label="Sell amount"
            value={value}
            onChange={handleChange}
        />
    )
}

export default NumberInput;