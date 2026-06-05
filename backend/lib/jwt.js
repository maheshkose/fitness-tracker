export const generateCookies = async(user, res) => {
  // console.log(user);
  // console.log("generateCookies");
  
  const token = await user.generateJwtToken();
  // console.log("generateJwtToken",token);
  
  const cookieName = "UserToken";

  const isProd = process.env.NODE_ENV === "production";

return res
  .status(200)
  .cookie(cookieName, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  .json({
    success: true,
    message: "User Logged in successfully",
  });
};
