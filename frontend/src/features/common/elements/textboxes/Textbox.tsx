import React from 'react';
import { TextareaInterface } from './interfaces';

const Textbox = ({
    placeHolder,
    label,
    value,
    handleChange,
    id,
}: TextareaInterface) => {
    return (
        <>
            <label className="text-white">
                {label}
                <textarea
                    className="bg-white focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                    name="postContent"
                    rows={4}
                    cols={40}
                    placeholder={placeHolder}
                    id={id}
                    value={value}
                    onChange={handleChange}
                />
            </label>
        </>
    );
};

export default Textbox;
