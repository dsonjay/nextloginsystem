'use client'

import { Fetch } from "@/helper/Fetch";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";
import { logout } from "@/helper/handleLogout";
import { getLocalStorage, removeLocalStorage } from "@/helper/localStorage";

const HomeComp = () => {
    const[user, setUser] = useState();
    const[error, setError] = useState();

    const navigate = useRouter();

    const userId = getLocalStorage("userId");

    const fetchDataFunc = async () => {
        const userId = localStorage.getItem("userId");
        const fetchData = await Fetch(`http://localhost:3000/api/user/${userId}`);
        const res = await fetchData.json();
        return res;
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFunc();
            setUser(data.data);
            if (!data.success){
                // navigate.push("/login");
                logout();
                removeLocalStorage("userId");
            }
        };
        fetchData();
    }, [])

    let name, email, password = useRef();

    const handleSubit = async () => {
        
        const uname = name.value
        const uemail = email.value
        const upassword = password.value

        try {
            if (uname.length === 0 || uemail.length === 0) {
                setError("Name and email must not should be empty");
            } 
            // upassword.length != 0 && 
            else if (upassword.length != 0 && upassword.length < 6){
                setError("Password should grather than 5")
            }else{
                const res = await Fetch(`/api/user/${userId}`, "PUT",  {name: uname, email: uemail, password: upassword});
                const data = await res.json();
                // setError(res.message)
                if (!res.ok){
                    setError(res.statusText)
                }

                if (data.success){
                    setError(data.message)
                    password.value = ""
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = async () => {
        try {
            const res = await Fetch(`/api/user/${userId}`, "DELETE");
            if (!res.ok) {
                setError(res.statusText)
            }
            const data = await res.json();
            if (data.success) {
                setError(data.message)
                removeLocalStorage("userId");
                setTimeout(() => {
                    navigate.push("/login")
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <>
        
        <div>
            
            <div className="bg-white w-[350px] flex items-center justify-center flex-col gap-5 py-10">
                {
                    error && (
                        <div className='bg-red-300 w-[200px] text-center p-2'>{error}</div>
                    )
                }
                <div className='flex flex-col gap-3'>
                    <h2>Update User</h2>
                    <input type='text' placeholder='email' className='bg-gray-300 px-3 py-2 rounded-md outline-none' ref={(e) => name = e} name='name' autoComplete='true' defaultValue={user?.name} />

                    <input type='text' placeholder='email' className='bg-gray-300 px-3 py-2 rounded-md outline-none' ref={(e) => email = e} name='email' autoComplete='true' defaultValue={user?.email} />

                    <input type='text' placeholder='password' className='bg-gray-300 px-3 py-2 rounded-md outline-none' ref={(e) => password = e} name='password' autoComplete='true' />

                    <button className='bg-gray-400 rounded-md px-2 py-3 cursor-pointer' onClick={handleSubit}>Update</button>
                </div>
            </div>
            <div className="flex justify-between">
                <LogoutButton />
                <button className='bg-red-500 mt-2 px-2 py-2 cursor-pointer text-white' onClick={handleDeleteUser}>Delete User</button>
            </div>
        </div>
        </>
    );
};

export default HomeComp;