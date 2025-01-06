import React from 'react';
import styled from 'styled-components';

const CurrencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
];

const StyledPriceInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const CurrencySelect = styled.select`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

const CentAmountInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

interface Props {
    label?: string;
    name: string;
    value: { currencyCode: string; centAmount: number };
    handleChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

const PriceInput: React.FC<Props> = ({ name, value, label, handleChange }) => {
    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange(event);
    };

    const handleCentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event);
    };

    return (
        <StyledPriceInput>
            <label>{label}</label>
            <CentAmountInput
                type="number"
                name={`${name}.centAmount`}
                value={value.centAmount}
                onChange={handleCentAmountChange}
            />
            <CurrencySelect name={`${name}.currencyCode`} value={value.currencyCode} onChange={handleCurrencyChange}>
                {CurrencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </CurrencySelect>

        </StyledPriceInput>
    );
};

export default PriceInput;