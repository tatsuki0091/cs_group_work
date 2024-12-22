import React from 'react';
import Input from '../../common/elements/inputs/Input';
import Textbox from '../../common/elements/textboxes/Textbox';
import ErrorMessages from '../../common/elements/errors/ErrorMessages';
import { userInputInterface } from '../interfaces';
const UserInput = ({
    username,
    handleUsername,
    email,
    handleEmail,
    firstName,
    handleFirstName,
    lastName,
    handleLastName,
    password,
    handlePassword,
    introduction,
    handleIntroduction,
    sendRequest,
    errors,
}: userInputInterface) => {
    return (
        <>
            <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-24 mb-24">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
                    This is your profile
                </h1>
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={sendRequest}
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

export default UserInput;
