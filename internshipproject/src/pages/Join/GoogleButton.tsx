import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";

const GoogleLoginButton = () => {
  const [googleCode, setGoogleCode] = useState("google");
  const gooleLogin = (e: string | undefined) => {
    if (typeof e === "string") setGoogleCode(e);
  };
  //구글 로그인
  // useEffect(() => {
  //   fetch(`http://192.168.182.177:3000/user/branchSignin`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       code: googleCode,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (typeof res.data === "object") {
  //         alert("가입정보가 유효하지 않아, 회원가입 페이지로 이동합니다.");
  //       } else {
  //         localStorage.setItem("accessToken", res.userInfo.accessToken);
  //       }
  //     });
  // }, []);
  return (
    <GoogleOAuthProvider clientId="368022233833-2g5opl45js7reo1pl0lmejc0l6qi86od.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          gooleLogin(credentialResponse.credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
