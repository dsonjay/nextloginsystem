import { jwtVerify } from "jose";
import { authCheck } from "./helper/authChecker";
import { cookies } from "next/headers";
import { verifyToken } from "./helper/verifyUser";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = async (request) => {
   const auth = await authCheck("token");
   const cookieObj = cookies();
   

   
     try {
       if (!auth) {
         return Response.json(
           { message: "Token not found", success: false },
           { status: 401 }
         );
       }
       const cookieValue = cookieObj.get("token").value;

       const check = await verifyToken(cookieValue);

      //  console.log();

       // const requestHeaders = new Headers(request.headers);
       // requestHeaders.set("X-User-Payload", "check.payload");

       const requestHeaders = new Headers(request.headers);

       const response = NextResponse.next({
         request: {
           // New request headers
           headers: requestHeaders,
         },
       });

       response.headers.set("x-auth-user", check.payload.usrId);

       NextResponse.next();

       return response;

     } catch (err) {
      //  return Response.json({ error: err });
      // console.log(err);
      return Response.json(
        { message: "Un-authorized", success: false },
        { status: 401 }
      );
     }
};

export const config = {
  matcher: ["/api/user/:path*", "/api/user/:userId*"],
};
