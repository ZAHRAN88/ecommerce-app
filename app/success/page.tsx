"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface Props {
  searchParams: {
    session_id: string;
  };
}

export default function SuccessPage({ searchParams }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col text-center">
        {isMounted && <Confetti />}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* Success celebrations */}
          <div className="flex items-center justify-center rounded-full bg-green-500 p-3 animate-pulse">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col">
            
            <h1 className="text-4xl mb-5 font-bold text-gray-900 dark:text-white">
              Payment Successful
            </h1>
            <p className="text-lg font-semibold text-gray-600">
              Your payment was successful. Thank you for shopping with us.
            </p>

          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-4">
          <Link href="/" passHref>
            <p className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out">
              Go back home
            </p>
          </Link>
          <Link href="/contact" passHref>
            <p className="text-lg font-semibold text-indigo-600 flex items-center">
              Contact support
              <svg
                className="ml-1 w-4 h-4 transform transition-transform duration-300 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
