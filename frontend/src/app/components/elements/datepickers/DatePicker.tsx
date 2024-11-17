import React from 'react';
import ReactDatePicker from 'react-datepicker';
// import { DatePickerInterface } from './interfaces';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.css';

export interface DatePickerInterface {
    label: string;
    value: Date;
    handleChange: (
        date: Date | null,
        event?:
            | React.MouseEvent<HTMLElement, MouseEvent>
            | React.KeyboardEvent<HTMLElement>
            | undefined,
    ) => void;
}

const DatePicker = ({ label, value, handleChange }: DatePickerInterface) => {
    return (
        <>
            <label
                className="mb-2 block font-bold text-white"
                htmlFor="event_date"
            >
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
