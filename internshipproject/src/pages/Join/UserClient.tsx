import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components/macro";
import variables from "../../styles/variables";

interface Text {
  title: string;
  linkText: string;
  url: string;
}
interface Props {
  text: Text;
}

interface Info {
  userName: string;
  userEmail: string;
  companyName: string;
  companyRegistrationNumber: number;
  userPhoneNumber: string;
  userKeyInCode: string;
  companyEmail: string;
  companyPassword: string;
}
interface Login {
  companyEmail: string;
  companyPassword: string;
}
const UserClient = ({ text }: Props) => {
  const { title, linkText, url } = text;
  const [info, setInfo] = useState<Info>({
    userName: "",
    userEmail: "",
    userPhoneNumber: "",
    companyName: "",
    userKeyInCode: "",
    companyEmail: "",
    companyRegistrationNumber: 0,
    companyPassword: "",
  });
  const [login, setLogin] = useState<Login>({
    companyEmail: "",
    companyPassword: "",
  });
  const location = useNavigate();
  const [disable, setDisable] = useState<boolean>(true);
  const [disableCheck, setDisableCheck] = useState<boolean>(true);
  const [disableSignUp, setDisableSignUp] = useState<boolean>(false);

  //타이머
  const [count, setCount] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  //인증 비활성화
  const [block, setBlock] = useState<boolean>(false);
  const blockBox = () => {};

  //회원가입,로그인
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  //화면 이동
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
      info.companyPassword.length > 1 &&
      info.companyRegistrationNumber > -1 &&
      info.companyEmail.length > -1
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
          setCount(false);
        } else {
          alert("번호를 다시 입력하세요!");
        }
      });
  };
  const connect = () => {
    if (
      title === "기업 회원가입" &&
      disable === false &&
      disableCheck === false &&
      info.companyName.length > -1 &&
      info.companyPassword.length > 3 &&
      info.companyRegistrationNumber > -1
    ) {
      fetch(`http://127.0.0.1:3000/user/clientSignup`, {
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
      title !== "기업 회원가입" &&
      info.userEmail.includes("@") &&
      info.companyPassword.length > 3
    ) {
      fetch(`http://127.0.0.1:3000/user/clientSignin`, {
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
          throw console.log(response);
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
          {title === "기업 회원가입" && (
            <S.InputTop>
              <S.ClientName
                type="text"
                name="userName"
                maxLength={4}
                placeholder="담당자 성명"
                onChange={handleInputValue}
              />
              <S.ClientEmail
                type="text"
                name="userEmail"
                placeholder="담당자 이메일"
                onChange={handleInputValue}
              />
              <S.CenterRow>
                <S.Phone
                  name="userPhoneNumber"
                  type="text"
                  maxLength={11}
                  placeholder="담당자 휴대폰번호"
                  onChange={handleInputValue}
                  disabled={block}
                />
                <S.Check disabled={disable} onClick={postNumber}>
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
                        isPlaying={isPlaying}
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
                  disabled={disableCheck}
                  onClick={postNumberCheck}
                >
                  확인
                </S.CheckNumber>
              </S.CenterRow>
              <S.CenterRow>
                <S.PhoneNumberBox
                  name="companyName"
                  type="text"
                  placeholder="회사명"
                  onChange={handleInputValue}
                />
                <S.PhoneNumberBox
                  name="companyRegistrationNumber"
                  type="text"
                  placeholder="사업자 등록번호"
                  onChange={handleInputValue}
                />
              </S.CenterRow>
            </S.InputTop>
          )}
          <S.Input
            name="companyEmail"
            type="email"
            placeholder="회사계정 이메일"
            onChange={handleInputValue}
          />
          <S.Input
            name="companyPassword"
            type="password"
            placeholder="회사계정 비밀번호"
            onChange={handleInputValue}
          />
          {title === "기업 회원가입" ? (
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
      </S.CenterInput>
    </S.Center>
  );
};

export default UserClient;

const S = {
  Center: styled.div`
    ${variables.flex("column", "center", "center")}
    height:500px;
    margin-bottom: 10px;
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
    height:700px;
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
    width: 395px;
    height: 45px;
    margin: 8px 0;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: rgb(245, 245, 245);
  `,

  ClientName: styled.input`
    width: 110px;
    height: 45px;
    margin: 8px 5px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: rgb(245, 245, 245);
  `,
  ClientEmail: styled.input`
    width: 280px;
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
    border: none;
    border-radius: 6px;
    background-color: ${(props) =>
      props.disabled === true ? "lightgray" : "orange"};
    color: rgb(255, 255, 255);
  `,

  PhoneNumber: styled.input`
    width: 250px;
    height: 45px;
    margin: 8px 5px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) =>
      props.disabled === false ? "rgb(245, 245, 245)" : "lightgray"};
  `,

  PhoneNumberBox: styled.input`
    width: 250px;
    height: 45px;
    margin: 8px 5px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: rgb(245, 245, 245);
  `,

  CheckNumber: styled.button`
    width: 75px;
    height: 45px;
    margin: 0 0 8px 10px;
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
};
