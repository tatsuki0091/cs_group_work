// export interface Submit {
//   submit: string;
//   label: string;
//   url: string;
// }

export interface LoginInterface extends Object {
    email: string;
    password: string;
}

export interface CreateUserInterface {
    username: string;
    email: string;
    password: string;
    created: Date;
}

export interface ResetPasswordInterface {
    email: string;
    updated: Date;
}

export interface ResetPasswordValidationInterface {
    email: string;
}

export interface CreateUserValidationInterface {
    username: string;
    email: string;
    password: string;
    introduction: string;
}

export interface LoginUserValidationInterface {
    email: string;
    password: string;
}

export interface userInputInterface {
    username: string;
    handleUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
    firstName: string;
    handleFirstName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    lastName: string;
    handleLastName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    password: string;
    handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    introduction: string;
    handleIntroduction: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    sendRequest: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    errors: string[];
}
