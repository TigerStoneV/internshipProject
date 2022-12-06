import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
import Googlebutton from "./GoogleButton";
interface Text {
  title: string;
  linkText: string;
  url: string;
}
interface Props {
  text: Text;
}

interface Info {
  userEmail: string;
  userName: string;
  userPassword: string;
  userPhoneNumber: string;
  userKeyInCode: string;
  companyRegistrationNumber: number;
}
interface Login {
  email: string;
  password: string;
}

//카카오 로그인
const APIKEY = `15924408e3187627642a25f1aeed7c09`;
const REDIRECT_URI = `http://localhost:3000/join`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${APIKEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const User = ({ text }: Props) => {
  const { title, linkText, url } = text;
  const [info, setInfo] = useState<Info>({
    userEmail: "",
    userName: "",
    userPhoneNumber: "",
    userPassword: "",
    userKeyInCode: "",
    companyRegistrationNumber: 0,
  });

  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });
  const location = useNavigate();
  const [disable, setDisable] = useState<boolean>(true);
  const [disableCheck, setDisableCheck] = useState<boolean>(true);
  const [disableSignUp, setDisableSignUp] = useState<boolean>(true);
  //타이머
  const [count, setCount] = useState<boolean>(false);

  //인증 비활성화
  const [block, setBlock] = useState<boolean>(false);
  const blockBox = () => {};

  //카카오 로그인
  const handleLoginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  //회원가입,로그인
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  //화면이동
  const goTop = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //유효성
  useEffect(() => {
    if (
      info.userName.length > 1 &&
      info.userEmail.length > 5 &&
      info.userPhoneNumber.length > 10
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    if (disable === false && info.userKeyInCode.length > 3) {
      setDisableCheck(false);
    } else {
      setDisableCheck(true);
    }
    if (
      disableCheck === false &&
      disable === false &&
      info.userPassword.length > 1 &&
      info.companyRegistrationNumber > -1
    ) {
      setDisableSignUp(false);
    } else {
      setDisableSignUp(true);
    }
  }, [info]);

  //인증번호 발송
  const postNumber = () => {
    fetch(`http://127.0.0.1:3000/user/sendSMS`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: info.userEmail,
        userName: info.userName,
        userPhoneNumber: info.userPhoneNumber,
      }),
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("통신실패!");
      })
      .then((data) => {
        if (data.SMS) {
          alert(data.SMS);
          setCount(true);
          const timer = setTimeout(() => {
            fetch("http://127.0.0.1:3000/user", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userPhoneNumber: info.userPhoneNumber,
              }),
            })
              .then((response) => {
                if (response.ok === true) {
                  return response.json();
                }
                throw new Error("통신실패!");
              })
              .then((data) => alert(data.message));
          }, 180000);
          if (disableCheck === false) {
            clearTimeout(timer);
          }
        } else {
          alert("번호를 다시 입력하세요!");
        }
      });
  };

  //인증번호 확인
  const postNumberCheck = () => {
    fetch(`http://127.0.0.1:3000/user/contrastCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPhoneNumber: info.userPhoneNumber,
        userKeyInCode: info.userKeyInCode,
      }),
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
        throw alert("번호를 다시 전송해주세요!");
      })
      .then((data) => {
        if (data) {
          alert(data.verification);
        } else {
          alert("번호를 다시 입력하세요!");
        }
      });
  };

  const connect = () => {
    if (
      title === "개인 회원가입" &&
      disable === false &&
      disableCheck === false &&
      info.userPassword.length > 3 &&
      info.companyRegistrationNumber > -1
    ) {
      fetch(`http://127.0.0.1:3000/user/riderNormalSignup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
        })
        .catch((error) => {
          error.text().then((msg: any) => alert(msg));
        })
        .then((data) => {
          location("/join");
          goTop();
        });
    }
    if (
      title !== "개인 회원가입" &&
      info.userEmail.includes("@") &&
      info.userPassword.length > 3
    ) {
      fetch(`http://127.0.0.1:3000/user/riderNormalSignin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
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
            location("/");
            goTop();
          } else {
            alert("아이디 혹은 비밀번호를 확인 해 주세요");
          }
        });
    }
  };

  return (
    <S.Center>
      <S.CenterInput>
        <S.Title>{title}</S.Title>
        <S.Center>
          {title === "개인 회원가입" && (
            <S.InputTop>
              <S.Input
                type="text"
                name="userName"
                maxLength={4}
                placeholder="이름"
                onChange={handleInputValue}
              />
              <S.CenterRow>
                <S.Phone
                  name="userPhoneNumber"
                  type="text"
                  maxLength={11}
                  placeholder="전화번호"
                  onChange={handleInputValue}
                  disabled={block}
                />
                <S.Check onClick={postNumber} disabled={disable}>
                  전송
                </S.Check>
              </S.CenterRow>
              <S.CenterRow>
                <S.PhoneNumber
                  name="userKeyInCode"
                  type="text"
                  maxLength={4}
                  placeholder="숫자 4개 입력하세요"
                  onChange={handleInputValue}
                  disabled={block}
                />
                <S.CheckTime>
                  <S.Timer>
                    {count && (
                      <CountdownCircleTimer
                        isPlaying
                        duration={180}
                        colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
                        colorsTime={[7, 5, 2, 0]}
                        size={30}
                      >
                        {({ remainingTime }) => remainingTime}
                      </CountdownCircleTimer>
                    )}
                  </S.Timer>
                </S.CheckTime>
                <S.CheckNumber
                  onClick={postNumberCheck}
                  disabled={disableCheck}
                >
                  확인
                </S.CheckNumber>
              </S.CenterRow>
              <S.Input
                type="text"
                name="companyRegistrationNumber"
                maxLength={10}
                placeholder="회사 등록번호"
                onChange={handleInputValue}
              />
            </S.InputTop>
          )}
          <S.Input
            name="userEmail"
            type="email"
            placeholder="이메일"
            onChange={handleInputValue}
          />
          <S.Input
            name="userPassword"
            type="password"
            placeholder="비밀번호 (대문자,소문자,특수문자,숫자를 포함한 8자리수)"
            onChange={handleInputValue}
          />
          {title === "개인 회원가입" ? (
            <S.Button onClick={connect} disabled={disableSignUp}>
              {title}
            </S.Button>
          ) : (
            <S.Button onClick={connect}>{title}</S.Button>
          )}
        </S.Center>
        <Link to={url} className="link">
          {linkText}
        </Link>
        <S.Or />
        {title === "개인 로그인" && (
          <S.CenterIconRow>
            <S.AuthButtonKakao onClick={handleLoginKakao}>
              <S.Icon src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIuMDM5NCAxOC4zQzE3LjAzMTggMTguMyAyMS4wNzg5IDE1LjA5ODggMjEuMDc4OSAxMS4xNUMyMS4wNzg5IDcuMjAxMTYgMTcuMDMxOCA0IDEyLjAzOTQgNEM3LjA0NzA5IDQgMyA3LjIwMTE2IDMgMTEuMTVDMyAxMy43MjQ5IDQuNzIwNzUgMTUuOTgxOSA3LjMwMjI5IDE3LjI0MDdDNy4wMzYwNyAxOC4zNTU0IDYuNTY4NTUgMjAuMzE5OCA2LjU1MTQ3IDIwLjQzODVDNi41Mjc1NCAyMC42MDQ4IDYuNzE5MjUgMjAuNzQwNiA2Ljg4NzU4IDIwLjYyNTFDNy4wMTA1IDIwLjU0MDggOS4yNTI5NSAxOS4wMTAyIDEwLjQ1NDEgMTguMTkwNEMxMC45Njg4IDE4LjI2MjQgMTEuNDk4NiAxOC4zIDEyLjAzOTQgMTguM1oiIGZpbGw9IiMzQzFFMUUiLz4KPC9zdmc+Cg==" />
              카카오톡 로그인
            </S.AuthButtonKakao>
            <Googlebutton />
          </S.CenterIconRow>
        )}
      </S.CenterInput>
    </S.Center>
  );
};

export default User;

const S = {
  Center: styled.div`
    ${variables.flex("column", "center", "center")}
    height:500px;
  `,

  CenterRow: styled.div`
    ${variables.flex("row", "center", "center")}
    width:400px;
  `,

  CenterIconRow: styled.div`
    ${variables.flex("row", "center", "")}
    width:450px;
    margin-top: 20px;
  `,

  CenterInput: styled.div`
    ${variables.flex("column", "space-evenly", "center")}
    height:500px;
    width: 700px;
  `,

  Timer: styled.div`
    width: 50px;
    height: 50px;
  `,

  InputTop: styled.div`
    margin-top: 30px;
  `,

  Input: styled.input`
    width: 400px;
    height: 45px;
    margin: 8px 0;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: rgb(245, 245, 245);
  `,

  Phone: styled.input`
    width: 300px;
    height: 45px;
    margin: 8px 0;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) =>
      props.disabled === false ? "rgb(245, 245, 245)" : "lightgray"};
  `,

  Check: styled.button`
    width: 85px;
    height: 45px;
    margin: 8px 0 8px 10px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) =>
      props.disabled === true ? "lightgray" : "orange"};
    color: rgb(255, 255, 255);
  `,

  PhoneNumber: styled.input`
    width: 250px;
    height: 45px;
    margin: 8px 0;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) =>
      props.disabled === false ? "rgb(245, 245, 245)" : "lightgray"};
  `,

  CheckNumber: styled.button`
    width: 75px;
    height: 45px;
    margin: 8px 0 8px 10px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) =>
      props.disabled === true ? "lightgray" : "orange"};
    color: rgb(255, 255, 255);
  `,

  CheckTime: styled.div`
    width: 60px;
    height: 45px;
    margin: 0 0 8px 10px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    color: red;
  `,

  Button: styled.button`
    width: 400px;
    margin: 16px 0 20px;
    padding: 14px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) =>
      props.disabled === true ? "lightgray" : "orange"};
    color: rgb(255, 255, 255);
    cursor: pointer;
  `,

  Logo: styled.img`
    width: 130px;
    height: 50px;
    margin-bottom: 40px;
  `,

  Title: styled.div`
    font-size: 30px;
  `,

  Or: styled.div`
    width: 400px;
    margin-top: 20px;
    border-top: 2px solid lightgray;
  `,

  Icon: styled.img`
    width: 30px;
    margin-right: 10px;
  `,

  AuthButtonKakao: styled.button`
    width: 50%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #fee500;
    transition: 0.3s;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: gray;
      color: white;
    }
  `,

  AuthButtonGoogle: styled.button`
    width: 150px;
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin-top: 40px;
    background-color: white;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: gray;
      color: white;
    }
  `,
};
