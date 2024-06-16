// import { required, isEmail, passwordLength } from "./index";
import { REQUIRED, IS_EMAIL, PASSWORD_LENGTH_VALIDATION } from "../constants";
import { CreateUserValidationInterface } from "../interfaces";

import { PASSWORD_LENGTH } from "../constants";
const required = <T>(inputInfo: T): boolean => {
    if (inputInfo === "") {
        return true;
    }
    return false;
};

const isEmail = (inputInfo: string): boolean => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const serchfind = expression.test(inputInfo);
    if (serchfind === false) {
        return true;
    }
    return false;
};

const passwordLength = (passwordLength: number): boolean => {
    if (passwordLength < PASSWORD_LENGTH) {
        return true;
    }
    return false;
};


export const createValidateForm = (
    props: CreateUserValidationInterface
): Array<string> => {
    //
    const errors: Array<string> = [];
    // required
    if (required(props.username)) {
        errors.push("Username" + REQUIRED);
    }
    if (required(props.password)) {
        errors.push("Password" + REQUIRED);
    }
    if (required(props.email)) {
        errors.push("Email" + REQUIRED);
    }
    if (required(props.introduction)) {
        errors.push("Email" + REQUIRED);
    }

    // email format
    if (isEmail(props.email)) {
        errors.push("Email" + IS_EMAIL);
    }

    // password length
    if (passwordLength(props.email.length)) {
        errors.push("Password" + PASSWORD_LENGTH_VALIDATION);
    }

    return errors;
};
