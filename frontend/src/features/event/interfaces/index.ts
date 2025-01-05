export interface EventProps {
    name: string;
    event_start_date_time: Date;
    event_end_date_time: Date;
    address: string;
    description: string;
    latitude: string;
    longitude: string;
}

export interface EventInfoProps {
    id: number;
    name: string;
    event_start_date_time: string | Date;
    event_end_date_time: string | Date;
    description: string;
    latitude: string;
    longitude: string;
    organizer: {
        [key: string]: string | number;
    };
    participants: Array<string>;
    time_zone: string;
    created: string | Date;
    updated: string | Date;
}
