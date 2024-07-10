
'use client'
import React from 'react'
import Input from '../../components/elements/inputs/Input'
import Textbox from '../../components/elements/textboxes/Textbox'
import ErrorMessages from '../../components/elements/errors/ErrorMessages'
import { useInput } from "../../../hooks/useInput";
import { useForm } from "../../../hooks/useForm";
import useValidation from "../../../hooks/useValidation";
import { POST } from "../../../helpers/axios/constants";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { loginValidateForm } from "../../../features/auth/components/validataions/index"

const page = () => {
    const [email, , handleEmail, resetEmail] = useInput<string, HTMLInputElement>("");
    const [password, , handlePassword, resetPassword] = useInput<string, HTMLInputElement>("");
    const [errors, setError, resetValidation] = useValidation([]);
    const { push } = useRouter();
    const sendLoginequest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check validation
        const checkErrors = loginValidateForm({
            email: email,
            password: password,
        });
        // If there is an error, stop submit
        if (checkErrors.length > 0) {
            setError([...checkErrors]);
            return;
        }
        try {
            const apiResponse = await useForm({
                values: {
                    email: email,
                    password: password,
                },
                url: "/user/login/",
                httpMethod: POST,
            });
            if (apiResponse.status === 201) {
                resetEmail();
                resetPassword();
                resetValidation
                push("/");
            } else {
                setError([apiResponse.data.message]);
            }
            console.log(apiResponse)
        } catch (error) {
            console.log(error)
            console.error(`Failed to reset your password: ${error}`);
            throw new Error(`Failed to reset your password: ${error}`);
        }
    }

    return (
        <>
            <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-24 mb-24">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Login</h1>
                <form action="#" className="w-full flex flex-col gap-4" onSubmit={sendLoginequest}>
                    <div className="flex items-start flex-col justify-start">
                        <Input
                            placeHolder='tom1123'
                            label='Username'
                            value={email}
                            handleChange={handleEmail}
                            type='text'
                            id='username' />
                    </div>
                    <div className="flex items-start flex-col justify-start mb-10">
                        <Input
                            placeHolder='xxxxxxxxxxx'
                            label='Password'
                            value={password}
                            handleChange={handlePassword}
                            type='password'
                            id='password' />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">Register</button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? </span>
                    <Link className="text-white" href="/auth/create">Sign Up</Link>
                </div>
                <div className="mt-4">
                    <ErrorMessages errors={errors} />
                </div>
            </div >
        </>
    )
}

export default page