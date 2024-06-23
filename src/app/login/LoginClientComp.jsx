'use client'
import { Fetch } from '@/helper/Fetch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';



const LoginClientComp = () => {
    const [error, setError] = useState("");
    let email, password = useRef();

    const router = useRouter();

    const handleSubit = async () => {
        const emailVal = email.value;
        const passwordVal = password.value;

        // if (emailVal.length === 0 || passwordVal.length === 0) {
        //     setError("Fill all input");
        // }

        try {
            if (emailVal.length === 0 || passwordVal.length === 0) {
                setError("Fill all input");
            } else {
                // setError("");
                // email.value = "";
                // password.value = "";

                const data = {
                    email: emailVal,
                    password: passwordVal
                }

                const res = await Fetch("/api/auth/login", "POST", data);
                const ret = await res.json();
                if(!ret.success){
                    setError(ret.message)
                }else if(ret.success){
                    localStorage.setItem("userId", ret.userId);
                    setError("");
                    email.value = "";
                    password.value = "";
                    router.push("/")
                }
            }
        } catch (error) {
            console.log(error);
            setError("Something went wrong")
        }
    }

    return (
        <div className='bg-white w-[500px] flex items-center justify-center flex-col gap-5 py-3'>
            <h1>Login</h1>
            {
                error && (
                    <div className='bg-red-300 w-[200px] text-center p-2'>{error}</div>
                )
            }
            <div className='flex flex-col gap-3'>
                <input type='text' placeholder='email' className='bg-gray-300 px-3 py-2 rounded-md outline-none' ref={(e) => email = e} name='email' autoComplete='true' />
                <input type='text' placeholder='password' className='bg-gray-300 px-3 py-2 rounded-md outline-none' ref={(e) => password = e} name='password' autoComplete='true' />
                <button className='bg-gray-400 rounded-md px-2 py-3 cursor-pointer' onClick={handleSubit}>Login</button>
            </div>
            <Link href={"/sign-up"}>Register</Link>
        </div>
    );
};

export default LoginClientComp;