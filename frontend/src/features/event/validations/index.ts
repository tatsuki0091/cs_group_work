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
    if (required(props.date)) {
        errors.push('Event Date' + REQUIRED);
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
