import React from 'react';
import LoginClientComp from './loginClientComp';
import { authCheck } from '@/helper/authChecker';
import { redirect } from 'next/navigation';

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