import React from 'react';
import ReactDatePicker from 'react-datepicker';
// import { DatePickerInterface } from './interfaces';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.css';

import { DatePickerInterface } from './interfaces';

const DatePicker = ({
    label,
    value,
    handleChange,
    labelClass,
}: DatePickerInterface) => {
    return (
        <>
            <label className={`${labelClass}`} htmlFor="event_date">
                {label}
            </label>
            <ReactDatePicker
                className="bg-white focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                dateFormat="yyyy/MM/dd"
                selected={value}
                onChange={handleChange} //only when value has changed
                wrapperClassName={styles.form}
            />
        </>
    );
};

export default DatePicker;
