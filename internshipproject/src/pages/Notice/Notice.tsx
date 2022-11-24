import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
export interface Notice {
  id: string;
  title: string;
  content: string;
  view_count: string;
  created_at: string;
}

const Notice = () => {
  const [noticeData, setNoticeData] = useState<Notice[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
    async function fetchData() {
      const respons = await fetch("Data/NoticeData.json");
      const result = await respons.json();
      setNoticeData(result);
    }
    fetchData();

    fetch("http://172.20.10.5:3000/ping")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <>
      <S.CenterColumn>
        <S.NoticeListBox>
          {noticeData.map((data) => (
            <Accordion defaultActiveKey="0" key={data.id}>
              <Accordion.Item eventKey={data.id}>
                <Accordion.Header>{data.title}</Accordion.Header>
                <Accordion.Body>
                  <S.Center>
                    <S.ContentBox>
                      <S.Content>{data.content}</S.Content>
                      <S.Date>{data.created_at.slice(0, 10)}</S.Date>
                    </S.ContentBox>
                    <S.View>{data.view_count}</S.View>
                  </S.Center>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
          <S.BottomBox>
            <S.BoxSize>
              <S.Write onClick={handleShow}>글쓰기</S.Write>
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
                <S.InputTitle placeholder="제목을 입력하세요." />
                <S.Input type="text" placeholder="내용을 입력하세요." />
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    등록
                  </Button>
                </Modal.Footer>
              </Modal>
            </S.BoxSize>
          </S.BottomBox>
        </S.NoticeListBox>
      </S.CenterColumn>
    </>
  );
};

export default Notice;

const S = {
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

  NoticeListBox: styled.div`
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
    width: 100%;
    border: 1px solid lightgray;
  `,

  InputTitle: styled.input`
    height: 50px;
    margin: 20px 0 20px;
    border: none;
  `,

  ModalTitle: styled.div`
    font-size: 15px;
    color: gray;
  `,
};
