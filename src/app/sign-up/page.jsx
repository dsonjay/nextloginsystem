import SignUp from "@/components/SignUp";
import { authCheck } from "@/helper/authChecker";
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