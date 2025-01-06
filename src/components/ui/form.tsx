import React, { HTMLAttributes, PropsWithChildren } from 'react'
import styled from 'styled-components';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

type Props = PropsWithChildren<HTMLAttributes<HTMLFormElement>>;

const Form = ({ children, ...props }: Props) => {
    return (
        <StyledForm {...props}>
            {children}
        </StyledForm>
    )
}

export default Form