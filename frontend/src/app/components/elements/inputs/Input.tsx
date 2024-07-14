import React from 'react'
import { InputInterface } from './interfaces'


const Input = ({ placeHolder, label, value, handleChange, type, id }: InputInterface) => {
    return (
        <>
            <label
                className="mb-2 block font-bold text-white"
                htmlFor="username"
            >
                {label}
            </label>
            <input
                className="bg-white focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id={id}
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={handleChange}
            />
        </>
    )
}

export default Input