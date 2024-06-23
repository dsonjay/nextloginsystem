import { authCheck } from "@/helper/authChecker";
import SignUp from "./SignUp";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Sign up',
}


const signupPage =async () => {
    const auth = await authCheck('token');
    if(auth === true){
        redirect("/")
    }
    return (<SignUp />);
};

export default signupPage;