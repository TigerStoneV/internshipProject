import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";

const GoogleLoginButton = () => {
  const [googleCode, setGoogleCode] = useState("google");

  //구글 로그인
  const gooleLogin = (e: string | undefined) => {
    if (typeof e === "string") setGoogleCode(e);
    fetch(`http://192.168.182.177:3000/user/riderGoogleRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorizationCode: googleCode,
      }),
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("통신실패!");
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.accessToken);
          alert(data.message);
        } else {
          alert("아이디 혹은 비밀번호를 확인 해 주세요");
        }
      });
  };
  //구글 로그인
  // useEffect(() => {
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
