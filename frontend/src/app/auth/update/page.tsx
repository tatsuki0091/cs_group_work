'use client';
import React, { useEffect } from 'react';
import { useInput } from '../../../hooks/useInput';
import { useForm } from '../../../hooks/useForm';
import { useRouter } from 'next/navigation';
import useValidation from '../../../hooks/useValidation';
import { GET, PATCH } from '../../../helpers/axios/constants';
import UserInput from '@/features/auth/components/UserInput';
import { setErrorMessages, openModal } from '@/features/common/utilities/index';
import Modal from '@/features/common/elements/modals/Modal';
import Check from '@/features/common/elements/modals/Check';

const page = () => {
    const [isModalOpen, setIsModalOpen] = useInput<boolean, HTMLInputElement>(
        false,
    );
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
    const { push } = useRouter();

    // Fetch User info
    const fetchUser = async () => {
        const apiResponse = await useForm({
            values: {},
            url: '/user/update/',
            httpMethod: GET,
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
                'Content-Type': 'application/json',
            },
        });
        if (updateApiResponse.status === 200) {
            resetValidation();
            resetPassword();
            openModal(setIsModalOpen);
        } else {
            setErrorMessages(updateApiResponse.response.data, setError);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

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
                sendRequest={sendUpdateRequest}
                errors={errors}
            />
            <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                <h1 className="text-center text-xl font-bold">Updated</h1>
                <Check />
            </Modal>
        </>
    );
};

export default page;
