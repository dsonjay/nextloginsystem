import React from 'react';
import { authCheck } from '@/helper/authChecker';
import { redirect } from 'next/navigation';
import LoginClientComp from '@/components/LoginClientComp';

export const metadata = {
    title: 'Login',
}


const loginPage = async () => {
    const auth = await authCheck("token");
    if(auth === true){
        redirect("/")
    }
    console.log(auth);
    return (<LoginClientComp />);
};

export default loginPage;