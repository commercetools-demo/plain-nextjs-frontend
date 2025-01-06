import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {
    type?: 'submit' | 'reset' | 'button'
}

export const Button = (props: Props) => {
    return (
        <button {...props} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">{props.children}</button>
    )
}