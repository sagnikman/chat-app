import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login{' '}
                    <span className="text-blue-300 font-semibold">
                        RealChat
                    </span>
                </h1>
                <form>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="w-full input input-bordered h-10 mt-8"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10 mt-4"
                        />
                    </div>
                    <Link
                        to="/signup"
                        className="text-sm hover-underline hover:text-blue-600 mt-2 inline-block"
                    >
                        {"Don't"} have an account?
                    </Link>
                    <div>
                        <button className="btn btn-block btn-sm mt-3">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
