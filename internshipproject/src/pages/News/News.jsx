import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useSearchParams } from "react-router-dom";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
import { useDispatch, useSelector } from "react-redux";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";

// 최종 수정 오류로 인하여 ts=>jsx 변환 및 추후 적용
// export interface News {
//   id: number;
//   title: string;
//   content: string;
//   viewCount: string;
//   imageUrl: string;
//   createdAt: string;
// }
// interface Search {
//   searchParams: Params;
// }
// interface Params {
//   get: string;
// }

// interface AdminId {
//   getAdminId: string;
// }
// interface Headers {
//   append(name: string, value: string): void;
//   delete(name: string): void;
//   get(name: string): string | null;
//   has(name: string): boolean;
//   set(name: string, value: string): void; // 우리가 사용한 메서드!!!!!!
//   forEach(
//     callbackfn: (value: string, key: string, parent: Headers) => void,
//     thisArg?: any
//   ): void;
// }

const News = () => {
  // 최종 수정 오류로 인하여 ts=>jsx 변환 및 추후 적용
  // const [newsData, setNewsData] = useState<News[]>([]);
  // const [title, setTitle] = useState<string>();
  // const [content, setContent] = useState<string>();
  // const [image, setImage] = useState<string>();
  // const [show, setShow] = useState<boolean>(false);
  // const [showMoreOffsetCount, setShowMoreOffsetCount] = useState<number>(6);
  const [newsData, setNewsData] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [show, setShow] = useState(false);
  const [showMoreOffsetCount, setShowMoreOffsetCount] = useState(6);

  //admin 권한 부여
  const admin = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //이미지 저장
  const uploader = Uploader({
    apiKey: "free",
  });

  //제목 입력
  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };
  //내용 입력
  const handleInputContent = (e) => {
    setContent(e.target.value);
  };
  //페이지네이션
  function showMoreButtonApiRequest() {
    setShowMoreOffsetCount(showMoreOffsetCount + 6);
  }

  //통신
  useEffect(() => {
<<<<<<< HEAD:internshipproject/src/pages/News/News.tsx
    //   async function fetchData() {
    //     const respons = await fetch("Data/NewsData.json");
    //     const result = await respons.json();
    //     setNewsData(result);
    //   }
    //   fetchData();

    fetch(
      `http://172.20.10.2:3000/post/news?offset=0&limit=${showMoreOffsetCount}`
=======
    fetch(
      `http://172.20.10.5:3000/post/news?offset=0&limit=${showMoreOffsetCount}`
>>>>>>> 29dd523 ([modify]front/최종):internshipproject/src/pages/News/News.jsx
    )
      .then((res) => res.json())
      .then((res) => {
        setNewsData(res.data);
      });
  }, [showMoreOffsetCount]);

  // 글쓰기
  const Post = () => {
    fetch(`http://172.20.10.5:3000/post/news`, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        content,
        imageUrl: image,
        adminId: 1,
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
  };
<<<<<<< HEAD:internshipproject/src/pages/News/News.tsx
  console.log(image);
=======
>>>>>>> 29dd523 ([modify]front/최종):internshipproject/src/pages/News/News.jsx
  return (
    <>
      <S.CenterColumn>
        {newsData.map((data) => (
          <div key={data.id}>
            <S.NewsList>
              <S.Box>
                <S.Link to={`/news/${data.id}`}>
                  <S.image src={data.imageUrl} />
                  <S.MessageBox>
                    <S.Title>{data.title}</S.Title>
                    <S.MessageBottom>
                      <S.Content>{data.createdAt.slice(0, 10)}</S.Content>
                      <S.Content>{data.viewCount}</S.Content>
                    </S.MessageBottom>
                  </S.MessageBox>
                </S.Link>
              </S.Box>
            </S.NewsList>
          </div>
        ))}
      </S.CenterColumn>
      <S.BottomBox>
        <S.BoxSize></S.BoxSize>
        <S.BoxSize>
          <S.ViewMore onClick={showMoreButtonApiRequest}>
            ViewMore(Click)
          </S.ViewMore>
        </S.BoxSize>
        <S.BoxSize>
          {admin === true && <S.Write onClick={handleShow}>글쓰기</S.Write>}
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
              onChange={handleInputTitle}
            />
            <S.Input
              type="text"
              placeholder="내용을 입력하세요."
              onChange={handleInputContent}
            />

            <UploadDropzone
              uploader={uploader}
              onUpdate={(files) => setImage(files[0].fileUrl)}
              width="100%"
              height="230px"
            />
            <Modal.Footer>
              <Button variant="primary" onClick={Post}>
                등록
              </Button>
            </Modal.Footer>
          </Modal>
        </S.BoxSize>
      </S.BottomBox>
    </>
  );
};

export default News;

const S = {
  NewsMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual02.png");
  `,

  NewsMainImageMessage: styled.div`
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

  Box: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 80%;
    transition: 0.8s;

    &:hover {
      border: 1px solid #212121;
    }
  `,

  CenterColumn: styled.div`
    ${variables.flex("row", "center", "flex-start")}
    flex-wrap: wrap;
    height: 100%;
  `,

  News: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,

  NewsBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 100%;
    height: 100%;
  `,

  NewsListBox: styled.div`
    height: 350px;
  `,

  NewsList: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 380px;
    height: 400px;
    margin-bottom: 20px;
    cursor: pointer;
  `,

  MessageBox: styled.div`
    ${variables.flex("column", "space-between", "center")}
    width:70%;
  `,

  Number: styled.div`
    text-align: center;
    height: 100%;
    width: 5%;
    font-size: 30px;
    color: gray;
  `,

  Title: styled.div`
    font-size: 20px;
    font-weight: 500;
    line-height: 1.5;
    color: #1a1a1a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
    margin-top: 10px;
  `,

  Content: styled.div`
    font-size: 15px;
    margin: 10px;
    color: gray;
  `,

  image: styled.img`
    width: 320px;
    height: 304px;
    border-radius: 5px;
  `,

  MessageBottom: styled.div`
    ${variables.flex()}
  `,

  Link: styled(Link)`
    ${variables.flex("column", "center", "center")}
    text-decoration: none;
    color: black;
  `,

  BottomBox: styled.div`
    ${variables.flex("row", "space-evenly", "center")}
    margin : 20px 0 20px;
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
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      transform: scale(1.1);
    }
  `,

  BoxSize: styled.div`
    ${variables.flex()}
    width: 33%;
  `,

  Input: styled.input`
    height: 350px;
    margin: 7px 10px 7px;
    border: 1px solid lightgray;
  `,

  InputImage: styled.input`
    ${variables.flex()}
    height: 50px;
    border: none;
    margin-top: 7px;
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
