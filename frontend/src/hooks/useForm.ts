import { axiosMethods } from "../helpers/axios/axiosMap";

interface formProps<T> {
    values: T;
    url: string;
    httpMethod: string;
    headers?: object
    // onSubmit: (values: T) => void;
}


export const useForm = async<T extends object>({
    values,
    url,
    httpMethod,
    headers = {
        "Content-Type": "application/json",
    }
}: formProps<T>) => {
    let response = null
    if (httpMethod === 'post' || httpMethod === 'patch') {
        console.log(headers)
        response = await axiosMethods[httpMethod](url, values, { headers })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err)
                return err;
            });

    } else if (httpMethod === 'get') {
        response = await axiosMethods[httpMethod](url, { values, headers },)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err)
                return err;
            });

    }


    return response;
};
