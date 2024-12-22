'use client';
import React from 'react';
import { useInput } from '../../../hooks/useInput';
import { useForm } from '../../../hooks/useForm';
import useValidation from '../../../hooks/useValidation';
import { POST } from '../../../helpers/axios/constants';
import { useRouter } from 'next/navigation';
import { createValidateForm } from '../../../features/auth/validataions/index';
import UserInput from '@/features/auth/components/UserInput';
import { setErrorMessages } from '@/features/common/utilities/index';

const page = () => {
    // Set states
    const [username, , handleUsername, resetUsername] = useInput<
        string,
        HTMLInputElement
    >('');
    const [email, , handleEmail, resetEmail] = useInput<
        string,
        HTMLInputElement
    >('');
    const [firstName, , handleFirstName, resetFirstName] = useInput<
        string,
        HTMLInputElement
    >('');
    const [lastName, , handleLastName, resetLastName] = useInput<
        string,
        HTMLInputElement
    >('');
    const [password, , handlePassword, resetPassword] = useInput<
        string,
        HTMLInputElement
    >('');
    const [introduction, , handleIntroduction, resetIntroduction] = useInput<
        string,
        HTMLTextAreaElement
    >('');
    const [errors, setError, resetValidation] = useValidation([]);
    const { push } = useRouter();

    // Send a request to create user info
    const sendCreateRequest = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        // Check validation
        const checkErrors = createValidateForm({
            username: username,
            email: email,
            password: password,
            introduction: introduction,
        });
        // If there is an error, stop submit
        if (checkErrors.length > 0) {
            setError([...checkErrors]);
            return;
        }
        try {
            const apiResponse = await useForm({
                values: {
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    introduction: introduction,
                    created: new Date(),
                },
                url: '/user/create/',
                httpMethod: POST,
            });
            if (apiResponse.status === 201) {
                resetUsername();
                resetEmail();
                resetPassword();
                resetLastName();
                resetFirstName();
                resetValidation();
                resetIntroduction();
                push('/');
            } else {
                setErrorMessages(apiResponse.response.data, setError);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Failed to reset your password: ${error}`);
        }
    };
    return (
        <>
            <UserInput
                username={username}
                handleUsername={handleUsername}
                email={email}
                handleEmail={handleEmail}
                firstName={firstName}
                handleFirstName={handleFirstName}
                lastName={lastName}
                handleLastName={handleLastName}
                password={password}
                handlePassword={handlePassword}
                introduction={introduction}
                handleIntroduction={handleIntroduction}
                sendRequest={sendCreateRequest}
                errors={errors}
            />
        </>
    );
};

export default page;
