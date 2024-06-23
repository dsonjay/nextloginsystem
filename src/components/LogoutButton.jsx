'use client'

import { logout } from "@/helper/handleLogout";
import { removeLocalStorage } from "@/helper/localStorage";

const LogoutButton = () => {
    return (
        <button className='bg-gray-500 mt-2 px-2 py-2 cursor-pointer text-white' onClick={
            () => 
                {
                logout();
                removeLocalStorage("userId");
                }
        
        }>Logout</button>
    );
};

export default LogoutButton;