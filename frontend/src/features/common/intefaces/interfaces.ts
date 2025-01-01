export interface MapPoint {
    latitude: number;
    longitude: number;
}

export interface DateComponentProps {
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
