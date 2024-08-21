'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import PhoneInput from 'react-phone-input-2';

const Signup = () => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast(); 
  const router = useRouter(); 

  useEffect(() => {
    if (session?.user) {
      router.replace('/'); 
    }
  }, [session, router]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      try {
        const formData = new FormData(event.currentTarget);
        const signupResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`,
          {
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name'),
            phone: formData.get('phone'),
          }
        );

        const signInResponse = await signIn('credentials', {
          email: signupResponse.data.email,
          password: formData.get('password') as string,
          redirect: false,
        });

        if (signInResponse?.ok) {
          toast({
            title: "🎉 Registration Successful",
            description: "You have been logged in and redirected.",
            variant: "default", 
            className: "border border-purple-600 shadow-lg", 
          });
          router.replace('/'); 
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data.message;
          setError(errorMessage || 'Something went wrong. Please try again.');
          toast({
            title: "❌ Registration Failed",
            description: errorMessage || "Something went wrong. Please try again.",
            variant: "destructive",
            className: "border border-red-600 shadow-lg text-red-700 dark:text-red-400 bg-neutral-800", 
          });
        }
      }
    },
    [router, toast]
  );

  return (
    <div className="flex items-center py-8 justify-center min-h-screen bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 text-neutral-900 dark:text-neutral-100">
      <div className="relative flex max-w-4xl w-full rounded-xl overflow-hidden shadow-xl bg-white dark:bg-neutral-900">
        <div className="hidden lg:flex flex-col justify-center items-center p-8 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <Image
            src="/login.svg"
            alt="Signup Illustration"
            width={350}
            height={350}
            className="object-contain"
          />
        </div>

        <motion.div
          className="flex-1 p-8 sm:p-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-3xl font-bold mb-6">Create an Account</h1>
          {error && (
            <motion.div
              className="text-red-500 p-3 bg-neutral-900 border-red-900 border-2 rounded-lg text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                name="name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                name="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  name="password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-neutral-400 hover:text-gray-200 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone (optional)</label>
              <input
                type="text"
                placeholder="123-456-7890"
                className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                name="phone"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              Register
            </button>
          </form>

          <div className="relative flex items-center justify-center w-full my-4">
            <span className="bg-white dark:bg-neutral-900 px-2 text-sm text-neutral-400">or</span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            onClick={() => signIn('google')}
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
                fill="#4285F4"
              ></path>
              <path
                d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
                fill="#34A853"
              ></path>
              <path
                d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
                fill="#EA4335"
              ></path>
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-neutral-400 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
