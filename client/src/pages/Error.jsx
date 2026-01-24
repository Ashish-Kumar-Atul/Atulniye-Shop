import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

export default function ErrorPage() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://assets9.lottiefiles.com/packages/lf20_suhe7qtm.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black text-gray-800 dark:text-white px-4">
      <div className="w-full max-w-md">
        {animationData && <Lottie animationData={animationData} loop={true} />}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-2 text-center text-red-600">
        404 - Page Not Found
      </h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-6">
        Sorry! We can't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}