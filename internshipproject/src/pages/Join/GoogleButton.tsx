import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const [googleCode, setGoogleCode] = useState("google");
  const navigate = useNavigate();

  //구글 로그인
  const googleKey = process.env.REACT_APP_GOOGLE_TOKEN;

  const gooleLogin = (e: string | undefined) => {
    if (typeof e === "string") setGoogleCode(e);
    fetch(`http://127.0.0.1:3000/user/riderGoogleRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleAccessToken:
          "ya29.a0AeTM1ieCkQQsR9k6ZPqCjlnNlGHQuVNdBkDnK_L0d5vZZCEib3vM_a2pdfuYGbbqZFzKFYjxu8tq4UbqNgQ0l8vVexccXlHI3rLhUsio7Zeh5XAVXQ56SrofgOhclpAUi1Z_eEi5-d_Puh0f5xYFmsaomIm22QaCgYKARwSARMSFQHWtWOmxvUrPrQvcEDCRkuIfKeIcg0165",
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
          navigate("/");
        } else {
          alert("아이디 혹은 비밀번호를 확인 해 주세요");
        }
      });
  };

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
