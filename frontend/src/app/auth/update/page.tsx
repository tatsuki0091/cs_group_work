'use client';
import React, { useEffect } from 'react';
import Input from '../../components/elements/inputs/Input';
import Textbox from '../../components/elements/textboxes/Textbox';
import ErrorMessages from '../../components/elements/errors/ErrorMessages';
import { useInput } from '../../../hooks/useInput';
import { useForm } from '../../../hooks/useForm';
import { useRouter } from 'next/navigation';
import useValidation from '../../../hooks/useValidation';
import { GET, PATCH } from '../../../helpers/axios/constants';

const page = () => {
    const [username, setUsername, handleUsername] = useInput<
        string,
        HTMLInputElement
    >('');
    const [email, setEmail, handleEmail] = useInput<string, HTMLInputElement>(
        '',
    );
    const [firstName, setFirstName, handleFirstName] = useInput<
        string,
        HTMLInputElement
    >('');
    const [lastName, setLastName, handleLastName] = useInput<
        string,
        HTMLInputElement
    >('');
    const [password, , handlePassword, resetPassword] = useInput<
        string,
        HTMLInputElement
    >('');
    const [introduction, setIntroduction, handleIntroduction, ,] = useInput<
        string,
        HTMLTextAreaElement
    >('');
    const [errors, setError, resetValidation] = useValidation([]);
    const tokenValue = localStorage.getItem('access_token');
    // const [message, setMessage, resetMessage] =useInput<string>('');
    const { push } = useRouter();

    // Fetch User info
    const fetchUser = async () => {
        console.log(tokenValue);
        const apiResponse = await useForm({
            values: {},
            url: '/user/update/',
            httpMethod: GET,
            headers: {
                Authorization: `Bearer ${tokenValue}`,
                'Content-Type': 'application/json',
            },
        });
        if (apiResponse.status === 200) {
            setUsername(apiResponse.data.userInfo.username);
            setEmail(apiResponse.data.userInfo.email);
            setIntroduction(apiResponse.data.userInfo.introduction);
            setFirstName(apiResponse.data.userInfo.first_name);
            setLastName(apiResponse.data.userInfo.last_name);
        } else {
            push('/');
        }
        console.log(apiResponse);
    };

    // Update User
    const sendUpdateRequest = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        const updateApiResponse = await useForm({
            values: {
                username: username,
                email: email,
                password: password,
                introduction: introduction,
                first_name: firstName,
                last_name: lastName,
            },
            url: '/user/update/',
            httpMethod: PATCH,
            headers: {
                Authorization: `Bearer ${tokenValue}`,
                'Content-Type': 'application/json',
            },
        });
        if (updateApiResponse.status === 200) {
            resetValidation();
            resetPassword();
        } else {
            setError((prevState) => {
                const updatedErrors = [...prevState];
                if (updateApiResponse.response.data.error) {
                    for (const error of updateApiResponse.response.data.error) {
                        updatedErrors.push(error);
                    }
                } else {
                    updatedErrors.push(updateApiResponse.message);
                }
                return updatedErrors;
            });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-24 mb-24">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
                    This is your profile
                </h1>
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={sendUpdateRequest}
                >
                    <div className="flex items-start flex-col justify-start">
                        <Input
                            placeHolder="tom1123"
                            label="Username"
                            value={username}
                            handleChange={handleUsername}
                            type="text"
                            id="username"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <Input
                            placeHolder="xxxxxx@xxx.com"
                            label="Email"
                            value={email}
                            handleChange={handleEmail}
                            type="text"
                            id="email"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <Input
                            placeHolder="Tom"
                            label="First Name"
                            value={firstName}
                            handleChange={handleFirstName}
                            type="text"
                            id="firstName"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <Input
                            placeHolder="Smith"
                            label="Last Name"
                            value={lastName}
                            handleChange={handleLastName}
                            type="text"
                            id="lastName"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <Input
                            placeHolder="xxxxxxxxxxx"
                            label="Password"
                            value={password}
                            handleChange={handlePassword}
                            type="password"
                            id="password"
                        />
                    </div>
                    <div className="flex items-start flex-col justify-start">
                        <Textbox
                            placeHolder="xxxxxxxxxxx"
                            label="Introduction"
                            value={introduction}
                            handleChange={handleIntroduction}
                            id="introduction"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                    >
                        Update
                    </button>
                </form>
                <div className="mt-4">
                    <ErrorMessages errors={errors} />
                </div>
            </div>
        </>
    );
};

export default page;
