import React, { FC } from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField'


// @ts-ignore
export interface NumberInputProps extends TextFieldProps {
    onChange: (value: string) => void;
  }

const NumberInput: FC<NumberInputProps> = ({onChange, ...props}: NumberInputProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);        
      };

    return (
        <TextField
            label="Amount"
            onChange={handleChange}
            {...props}
        />
    )
}

export default NumberInput;