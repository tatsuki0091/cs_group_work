// export interface DatePickerInterface {
//     label: string;
//     value: Date;
//     handleChange: MouseEvent;
// }

export interface DatePickerInterface {
    label: string;
    value: Date;
    labelClass?: string;
    handleChange: (
        date: Date | null,
        event?:
            | React.MouseEvent<HTMLElement, MouseEvent>
            | React.KeyboardEvent<HTMLElement>
            | undefined,
    ) => void;
}
