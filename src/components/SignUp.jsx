'use client'
import { Fetch } from '@/helper/Fetch';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react';

const SignUp = () => {
    const [error, setError] = useState("");
    let name, email, password = useRef();
    const router = useRouter();

    const handleSubit = async () => {
        const nameVal = name.value;
        const emailVal = email.value;
        const passwordVal = password.value;

        try {
            if (nameVal.length === 0 || emailVal.length === 0 || passwordVal.length === 0) {
                setError("Fill all input");
            } else {
                setError("");
                const data = {
                    name: nameVal,
                    email: emailVal,
                    password: passwordVal
                }

                const daeta = await Fetch("api/auth/create", "POST", data);
                const res = await daeta.json();
                
                if (!res.success){
                    setError(res.message)
                }else if(res.success){
                    setError("");
                    name.value = "";
                    email.value = "";
                    password.value = "";
                    router.push("/login")
                }
            }
        } catch (error) {
            setError("Something went wrong");
        }
    }

    return (
        <div className='bg-white w-[500px] flex items-center justify-center flex-col gap-5 py-3'>
            <h1>Signup</h1>
            {
                error && (
                    <div className='bg-red-300 w-[200px] text-center p-2'>{error}</div>
                )
            }
            <div className='flex flex-col gap-3'>
                <input type='text' placeholder='name' className='bg-gray-300 px-3 py-2 rounded-md outline-none' ref={(e) => name = e} name='name' autoComplete="true" />
                <input type='text' placeholder='email' className='bg-gray-300 px-3 py-2 rounded-md outline-none' ref={(e) => email = e} name='email' autoComplete="true" />
                <input type='text' placeholder='password' className='bg-gray-300 px-3 py-2 rounded-md outline-none' ref={(e) => password = e} name='password' autoComplete="true" />
                <button className='bg-gray-400 rounded-md px-2 py-3 cursor-pointer' onClick={handleSubit}>Login</button>
            </div>
            <Link href={"/login"}>Login</Link>
        </div>
    );
};

export default SignUp;