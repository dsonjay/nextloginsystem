import { cookies } from "next/headers";


export const authCheck = async (name) => {
  const cookieObj = cookies();

  // Check if the "token" cookie exists
  if (!cookieObj.has("token")) {
    return false;
  }

  // Retrieve the value of the specified cookie name
  const cookieValue = cookieObj.get(name).value;

  if(cookieValue === 'undefined'){
    return false
  }else{
    return true;
  }
};
