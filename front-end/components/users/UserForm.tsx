import { StatusMessage } from '@types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import UserService from '@services/UserService';

// TODO:
const UserLoginForm: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const { t, ready } = useTranslation('common');

    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!name || name.trim() === '') {
            setNameError(t('login.validate.name'));
            result = false;
        }

        if (!password || password.trim() === '') {
            setPasswordError(t('login.validate.password'));
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        try {
            const response = await UserService.loginUser({
                username: name,
                password,
                userId: 0,
                role: '',
            });

            let responseData;

            try {
                responseData = await response.json();
            } catch (error) {
                console.error('Failed to parse response JSON:', error);
                responseData = null;
            }

            if (!response.ok) {
                const errorMessage = responseData?.message || t('general.error');
                setStatusMessages([
                    {
                        message: errorMessage,
                        type: 'error',
                    },
                ]);
                return;
            }

            const { token, fullname, username, role } = responseData;

            localStorage.setItem('loggedInUser', username);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            setStatusMessages([
                {
                    message: t('login.success'),
                    type: 'success',
                },
            ]);

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);

            setStatusMessages([
                {
                    message: t('general.error'),
                    type: 'error',
                },
            ]);
        }
    };

    return (
        <>
            <h3 className="px-0">Login</h3>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    'text-red-800': type === 'error',
                                    'text-green-800': type === 'success',
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    {t('login.label.username')}
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {nameError && <div className="text-red-800 ">{nameError}</div>}
                </div>
                <div className="mt-2">
                    <div>
                        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
                            {t('login.label.password')}
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                        />
                        {passwordError && <div className=" text-red-800">{passwordError}</div>}
                    </div>
                </div>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    {t('login.button')}
                </button>
            </form>
        </>
    );
};

export default UserLoginForm;
