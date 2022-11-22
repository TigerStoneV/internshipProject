import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  email: string;
  name: string;
  password: number;
  checkPassword: number;
  phone_number: number;
}
interface Login {
  email: string;
  password: number;
}
//카카오 로그인
const APIKEY = `15924408e3187627642a25f1aeed7c09`;
const REDIRECT_URI = `http://localhost:3000/join`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${APIKEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const User = ({ text }: Props) => {
  const { title, linkText, url } = text;
  const [info, setInfo] = useState<Info>({
    email: "",
    name: "",
    password: 0,
    checkPassword: 0,
    phone_number: 0,
  });
  const [login, setLogin] = useState<Login>({
    email: "",
    password: 0,
  });
  const location = useNavigate();

  //카카오 로그인
  const handleLoginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
    location("/");
  };

  //회원가입,로그인
  const handleInputValue = (e: any) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const connect = () => {
    if (
      info.email.includes("@") &&
      typeof info.name === "string" &&
      info.phone_number > 0
    ) {
      //   fetch(`${API.join}/signup`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(info),
      //   });
      location("/");
      goTop();
      alert("회원가입 되었습니다.");
      console.log(info);
    }
    if (login.email.includes("@")) {
      // fetch(`${API.join}/signin`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(login),
      // })
      //   .then(response => {
      //     if (response.ok === true) {
      //       return response.json();
      //     }
      //     throw new Error('통신실패!');
      //   })
      //   .then(data => {
      //     if (data.data) {
      //       localStorage.setItem('token', data.data);
      //       navigate('/', { replace: true });
      //     } else {
      //       alert('아이디 혹은 비밀번호를 확인 해 주세요');
      //     }
      //   });
      location("/");
      goTop();
      alert("로그인 되었습니다");
      console.log(login);
    }
  };

  const goTop = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <S.Center>
      <S.Logo src="http://www.star-pickers.com/html/img/logo_gray.png" />
      <S.CenterInput>
        <S.Title>{title}</S.Title>
        <S.Center>
          {title === "회원가입" && (
            <form>
              <S.InputTop>
                <S.Input
                  type="text"
                  name="name"
                  placeholder="이름"
                  onChange={handleInputValue}
                />
                <S.CenterRow>
                  <S.Phone
                    name="phone_number"
                    type="number"
                    placeholder="전화번호"
                    onChange={handleInputValue}
                  />
                  <S.Check>전송</S.Check>
                </S.CenterRow>
                <S.CenterRow>
                  <S.PhoneNumber
                    name="checkPassword"
                    type="text"
                    placeholder="숫자 4개 입력하세요"
                    onChange={handleInputValue}
                  />
                  <S.CheckNumber>확인</S.CheckNumber>
                </S.CenterRow>
              </S.InputTop>
            </form>
          )}
          <S.Input
            name="email"
            type="email"
            placeholder="이메일"
            onChange={handleInputValue}
          />
          <S.Input
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={handleInputValue}
          />
          <S.Button onClick={connect}>{title}</S.Button>
        </S.Center>
        <Link to={url} className="link">
          {linkText}
        </Link>
        <S.Or />
        {title === "로그인" && (
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
    height:400px;
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
    background-color: rgb(245, 245, 245);
  `,
  Check: styled.button`
    width: 85px;
    height: 45px;
    margin: 8px 0 8px 10px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: orange;
    color: rgb(255, 255, 255);
  `,
  PhoneNumber: styled.input`
    width: 250px;
    height: 45px;
    margin: 8px 0;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: rgb(245, 245, 245);
  `,
  CheckNumber: styled.button`
    width: 135px;
    height: 45px;
    margin: 8px 0 8px 10px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: orange;
    color: rgb(255, 255, 255);
  `,
  Button: styled.button`
    width: 400px;
    margin: 16px 0 20px;
    padding: 14px;
    border: none;
    border-radius: 6px;
    background-color: orange;
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
