export interface InputInterface {
    placeHolder: string;
    label: string;
    value: string | number | readonly string[] | undefined;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    type: string;
    id: string;
}