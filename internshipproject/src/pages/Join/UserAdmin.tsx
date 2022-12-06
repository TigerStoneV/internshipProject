import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
import { useDispatch, useSelector } from "react-redux";

interface Text {
  title: string;
  linkText: string;
  url: string;
}
interface Props {
  text: Text;
}

interface Login {
  branchEmail: string;
  branchPassword: string;
}
const UserAdmin = ({ text }: Props) => {
  const { title, linkText, url } = text;
  const dispatch = useDispatch();

  const [login, setLogin] = useState<Login>({
    branchEmail: "",
    branchPassword: "",
  });
  const location = useNavigate();
  const [disable, setDisable] = useState<boolean>(true);
  const [disableCheck, setDisableCheck] = useState<boolean>(true);

  //화면이동
  const goTop = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //회원가입,로그인
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const connect = () => {
    if (login.branchEmail.includes("@")) {
      fetch(`http://127.0.0.1:3000/user/adminSignin`, {
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
          throw alert("아이디와 비밀번호를 확인해주세요.");
        })
        .then((data: any) => {
          if (data) {
            localStorage.setItem("token", data.accessToken);
            dispatch({ type: "권한", adminId: true });
            alert(data.message);
            location("/");
            goTop();
          }
        });
    }
  };

  //추후 admin 추가 회원가입 가능 시 대비 레이아웃
  return (
    <S.Center>
      <S.CenterInput>
        <S.Title>{title}</S.Title>
        <S.Center>
          {title === "관리자 회원가입" && (
            <S.InputTop>
              <S.ClientName
                type="text"
                name="userName"
                maxLength={4}
                placeholder="관리자 성명"
                onChange={handleInputValue}
              />
              <S.ClientEmail
                type="text"
                name="userEmail"
                placeholder="관리자 이메일"
                onChange={handleInputValue}
              />
              <S.CenterRow>
                <S.Phone
                  name="userPhoneNumber"
                  type="text"
                  maxLength={11}
                  placeholder="관리자 휴대폰번호"
                  onChange={handleInputValue}
                />
                <S.Check disabled={disable}>전송</S.Check>
              </S.CenterRow>
              <S.CenterRow>
                <S.PhoneNumber
                  name="userKeyInCode"
                  type="text"
                  maxLength={4}
                  placeholder="숫자 4개 입력하세요"
                  onChange={handleInputValue}
                />
                <S.CheckTime>
                  <S.Timer>
                    <CountdownCircleTimer
                      isPlaying
                      duration={180}
                      colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
                      colorsTime={[7, 5, 2, 0]}
                      size={30}
                    >
                      {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                  </S.Timer>
                </S.CheckTime>
                <S.CheckNumber disabled={disableCheck}>확인</S.CheckNumber>
              </S.CenterRow>
              <S.CenterRow>
                <S.CompanyName
                  name="branchName"
                  type="text"
                  placeholder="별따러가자 지점명"
                  onChange={handleInputValue}
                />
                <S.Address
                  name="branchAddress"
                  type="text"
                  placeholder="지점 주소"
                  onChange={handleInputValue}
                />
              </S.CenterRow>
            </S.InputTop>
          )}
          <S.Input
            name="branchEmail"
            type="email"
            placeholder="관리자 이메일"
            onChange={handleInputValue}
          />
          <S.Input
            name="branchPassword"
            type="password"
            placeholder="관리자 비밀번호"
            onChange={handleInputValue}
          />
          <S.Button onClick={connect}>{title}</S.Button>
        </S.Center>
        {/* <Link to={url} className="link">
          {linkText}
        </Link> */}
      </S.CenterInput>
    </S.Center>
  );
};

export default UserAdmin;

const S = {
  Center: styled.div`
    ${variables.flex("column", "center", "center")}
    height:450px;
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

  CompanyName: styled.input`
    width: 150px;
    height: 45px;
    margin: 8px 5px;
    padding: 15px 10px;
    border: none;
    border-radius: 6px;
    background-color: rgb(245, 245, 245);
  `,

  Address: styled.input`
    width: 300px;
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
};
