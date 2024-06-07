import { AxiosResponse } from "axios";

export interface MethodMap {
    [key: string]: (url: string, data?: object) => Promise<AxiosResponse>;
}
