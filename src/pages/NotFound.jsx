import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-white font-serif min-h-screen flex items-center justify-center not-found-immersive">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full sm:w-10/12 md:w-8/12 text-center">
                        <div
                            className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain flex items-center justify-center"
                            aria-hidden="true"
                        >
                            <h1 className="text-center text-black text-6xl sm:text-7xl md:text-8xl font-bold">
                                404
                            </h1>
                        </div>

                        <div className="mt-[-40px] relative z-10">
                            <h3 className="text-2xl text-black sm:text-3xl font-bold mb-4">
                                Look like you're lost
                            </h3>
                            <p className="mb-6 text-gray-700 sm:mb-5">
                                The page you are looking for is not available!
                            </p>

                            <button
                                onClick={() => navigate("/")}
                                className="my-5 bg-[#39ac31] hover:bg-[#2e8b28] text-white px-8 py-3 rounded-md transition-all duration-300 font-bold shadow-lg transform hover:scale-105"
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
