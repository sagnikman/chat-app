import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { loading, login } = useLogin();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login{' '}
                    <span className="text-blue-300 font-semibold">
                        RealChat
                    </span>
                </h1>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="w-full input input-bordered h-10 mt-8"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10 mt-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link
                        to="/signup"
                        className="text-sm hover-underline hover:text-blue-600 mt-2 inline-block"
                    >
                        {"Don't"} have an account?
                    </Link>
                    <div>
                        <button
                            className="btn btn-block btn-sm mt-3"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
