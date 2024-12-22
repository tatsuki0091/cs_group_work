export interface TextareaInterface {
    placeHolder: string;
    label: string;
    value: string | number | readonly string[] | undefined;
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    id: string;
}
