import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLInputElement> & {
    type?: 'text' | 'password' | 'email' | 'number';
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string;
    error?: string
}

const Input = ({ label, error, ...props }: Props) => {
    return (
        <div className="flex flex-row gap-1 items-center">
            <label>{label}</label>
            <input {...props} className="rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500" />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    )
}

export default Input