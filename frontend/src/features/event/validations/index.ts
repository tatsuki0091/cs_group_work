import { EventProps } from '../interfaces/index';
import { required } from '../../common/validations';
import { REQUIRED } from '../../common/constants';

export const createValidateForm = (props: EventProps): Array<string> => {
    //
    const errors: Array<string> = [];
    // required
    if (required(props.name)) {
        errors.push('Event Name' + REQUIRED);
    }
    if (required(props.event_start_date_time)) {
        errors.push('Event Start Date' + REQUIRED);
    }
    if (required(props.event_end_date_time)) {
        errors.push('Event End Date' + REQUIRED);
    }
    if (required(props.address)) {
        errors.push('Address' + REQUIRED);
    }
    if (required(props.description)) {
        errors.push('Description' + REQUIRED);
    }
    if (required(props.latitude)) {
        errors.push('Latitude' + REQUIRED);
    }
    if (required(props.longitude)) {
        errors.push('Longitude' + REQUIRED);
    }
    return errors;
};
