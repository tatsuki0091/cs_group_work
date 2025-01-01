import { DateComponentProps } from '../../intefaces/interfaces';

type OverwriteDateComponentProps = Omit<DateComponentProps, 'handleChange'> & {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export interface DateTimePickerInterface extends OverwriteDateComponentProps {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}
