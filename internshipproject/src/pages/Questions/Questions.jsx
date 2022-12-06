import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
import { useDispatch, useSelector } from "react-redux";
import NavbarBlock from "../../components/Nav/NavBlock";

// 최종 수정 오류로 인하여 ts=>jsx 변환 및 추후 적용
// export interface Question {
//   id: number;
//   title: string;
//   content: string;
//   viewCount: string;
//   createdAt: string;
// }

// interface PostQusetion {
//   adminId: number;
//   title: string;
//   content: string;
//   branchId: number;
// }

const Question = () => {
  //   const [questionData, setQuestionData] = useState<Question[]>([]);
  //   const [postData, setPostData] = useState<PostQusetion[]>([]);
  //   const [title, setTitle] = useState<string>();
  //   const [content, setContent] = useState<string>();
  //   const [show, setShow] = useState<boolean>(false);
  //   const [token, setToken] = useState<string>("undefined");
  const [questionData, setQuestionData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("undefined");
  const [update, setUpdate] = useState(0);

  //admin 권한 부여
  const admin = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // AOS 애니메이션
  useEffect(() => {
    AOS.init();
  });

  //통신
  useEffect(() => {
    fetch("http://127.0.0.1:3000/post/question?offset=0&limit=10")
      .then((res) => res.json())
      .then((res) => {
        setQuestionData(res.data);
      });
  }, [update]);

  //글쓰기
  const writeTitle = (e) => {
    setTitle(e.target.value);
  };
  const writeContent = (e) => {
    setContent(e.target.value);
  };

  const Post = () => {
    fetch(`http://127.0.0.1:3000/post/question`, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: 1,
        title: title,
        content: content,
        branchId: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("저장 완료");
        }
      });
    handleClose();
    setUpdate((res) => res + 1);
  };
  return (
    <>
      <S.QuestionImage>
        <NavbarBlock />
        <S.QuestionImageMessage>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            고객의 <b>소리</b>
          </div>
        </S.QuestionImageMessage>
      </S.QuestionImage>
      <div data-aos="fade-up" data-aos-offset="300" data-aos-duration="1000">
        <S.Center>
          <S.Question>QUESTION</S.Question>
        </S.Center>
      </div>
      <S.CenterColumn>
        <S.QuestionListBox>
          {questionData.map((data) => (
            <Accordion defaultActiveKey="0" key={data.id}>
              <Accordion.Item eventKey={data.title}>
                <Accordion.Header>{data.title}</Accordion.Header>
                <Accordion.Body>
                  <S.Center>
                    <S.ContentBox>
                      <S.Content>{data.content}</S.Content>
                      <S.Date>{data.createdAt.slice(0, 10)}</S.Date>
                    </S.ContentBox>
                    <S.View>{data.viewCount}</S.View>
                  </S.Center>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
          <S.BottomBox>
            <S.BoxSize>
              {admin === undefined && (
                <S.Write onClick={handleShow}>글쓰기</S.Write>
              )}
              <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <S.ModalTitle>Create New</S.ModalTitle>
                </Modal.Header>
                <S.InputTitle
                  placeholder="제목을 입력하세요."
                  onChange={writeTitle}
                />
                <S.Input
                  type="text"
                  placeholder="내용을 입력하세요."
                  onChange={writeContent}
                />
                <Modal.Footer>
                  <Button variant="primary" onClick={Post}>
                    등록
                  </Button>
                </Modal.Footer>
              </Modal>
            </S.BoxSize>
          </S.BottomBox>
        </S.QuestionListBox>
      </S.CenterColumn>
    </>
  );
};

export default Question;

const S = {
  QuestionImage: styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual01.png");
  `,

  QuestionImageMessage: styled.div`
    position: absolute;
    color: #fff;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 300;
    letter-spacing: -2px;
  `,

  Question: styled.div`
    font-size: 50px;
    font-weight: bold;
    padding: 40px 0 10px;
  `,

  NoticeMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual02.png");
  `,

  NoticeMainImageMessage: styled.div`
    position: absolute;
    color: #fff;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 400;
    letter-spacing: -2px;
  `,

  Center: styled.div`
    ${variables.flex()}
  `,

  CenterColumn: styled.div`
    ${variables.flex("column", "center", "center")}
    margin:30px 0 60px;
    height: 100%;
    padding-bottom: 50px;
  `,

  Notice: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,

  NewsBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 100%;
    height: 100%;
  `,

  QuestionListBox: styled.div`
    width: 80%;
    height: 100%;
    margin-top: 30px;
    border-top: 2px solid black;
  `,

  NoticeList: styled.div`
    ${variables.flex()}
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #d0d0d0;
  `,

  MessageBox: styled.div`
    ${variables.flex("column", "space-between", "center")}
    width:70%;
    height: 130px;
  `,

  Number: styled.div`
    text-align: center;
    height: 100%;
    width: 5%;
    font-size: 30px;
    color: gray;
  `,

  Title: styled.div`
    text-align: center;
    font-size: 30px;
    width: 100%;
    height: 50px;
  `,

  Des: styled.div`
    font-size: 20px;
  `,

  ContentBox: styled.div`
    ${variables.flex("column", "center", "")}
    width: 100%;
    height: 100%;
  `,

  Content: styled.div`
    width: 100%;
    font-size: 15px;
  `,

  image: styled.img`
    width: 100%;
    height: 100%;
  `,

  MessageBottom: styled.div`
    ${variables.flex("row", "center", "center")}
  `,

  Link: styled(Link)`
    text-decoration: none;
    color: black;
  `,

  View: styled.div`
    width: 50px;
    height: 50%;
    font-size: 15px;
    color: gray;
    text-align: center;
  `,

  Date: styled.div`
    margin-top: 5px;
    color: gray;
    margin-left: 10px;
  `,

  BottomBox: styled.div`
    ${variables.flex("row", "space-evenly", "center")}
  `,

  Write: styled.button`
    width: 80px;
    height: 40px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: white;
  `,

  ViewMore: styled.div`
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    margin-top: 20px;
  `,

  Box: styled.div`
    ${variables.flex()}
    width: 33%;
  `,

  BoxWrite: styled.div`
    ${variables.flex("row", "flex-end", "center")}
    width: 33%;
  `,

  BoxSize: styled.div`
    ${variables.flex()}
    width: 33%;
  `,

  Input: styled.input`
    height: 450px;
    margin: 7px 10px 7px;
    border: 1px solid lightgray;
  `,

  InputTitle: styled.input`
    height: 50px;
    margin: 7px 10px 7px;
    border: none;
  `,

  ModalTitle: styled.div`
    font-size: 15px;
    color: gray;
  `,
};
