import { axiosMethods } from '../helpers/axios/axiosMap';
interface formProps<T> {
    values: T;
    url: string;
    httpMethod: string;
    headers?: object;
}

export const useForm = async <T extends object>({
    values,
    url,
    httpMethod,
    headers = {
        'Content-Type': 'application/json',
    },
}: formProps<T>) => {
    let response = null;
    if (httpMethod === 'post' || httpMethod === 'patch') {
        const response = await axiosMethods[httpMethod](url, values, {
            headers,
        })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        return response;
    } else if (httpMethod === 'get') {
        response = await axiosMethods[httpMethod](url, { values, headers })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }

    return response;
};
