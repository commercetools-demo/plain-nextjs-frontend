import React, { HTMLAttributes } from 'react'
import LoadingSpinnerComponent from './loading-spinner'

type Props = HTMLAttributes<HTMLButtonElement> & {
    type?: 'submit' | 'reset' | 'button'
    loading?: boolean
}

export const Button = ({ loading, ...props }: Props) => {
    return (
        <button {...props} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            <div className='inline'>
                {props.children}
                {loading && <LoadingSpinnerComponent />}
            </div>
        </button>
    )
}