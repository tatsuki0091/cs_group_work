export type OnChangeFunction = (
    date: Date | null,
    event?:
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.KeyboardEvent<HTMLElement>,
) => void;
