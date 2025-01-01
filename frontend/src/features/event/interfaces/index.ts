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
    date: Date;
    description: string;
    latitude: string;
    longitude: string;
    organizer: string;
    participants: Array<string>;
    time_zone: string;
    created: Date;
    updated: Date;
}
