import React from 'react';
// import DateTimePicker from 'react-datetime-picker';
import { DateTimePickerInterface } from './interfaces';
import { useState } from 'react';
// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateTimePicker = ({
    label,
    value,
    handleChange,
    labelClass,
}: DateTimePickerInterface) => {
    return (
        <>
            <div>
                <label className={`${labelClass}`} htmlFor="event_date">
                    {label}
                </label>
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="datetime-local"
                    onChange={handleChange}
                />
                {/* {value && (
                    <p className="text-white">
                        Selected Date and Time: {value.toLocaleString()}
                    </p>
                )} */}
            </div>
        </>
    );
};

export default DateTimePicker;
