import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Function to sign a JWT
export const signToken = async (payload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
  return token;
};

// Function to verify a JWT
export const verifyToken = async (token) => {
  try {
    const payload = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    // console.error(err);
    // throw new Error(err);
    throw err;
  }
};
