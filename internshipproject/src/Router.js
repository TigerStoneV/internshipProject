import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavbarStar from "./components/Nav/Nav";
import Company from "./pages/Introduce/Company/Company";
import Contact from "./pages/Introduce/Contact/Contact";
import Team from "./pages/Introduce/Team/Team";
import Tech from "./pages/Introduce/Tech/Tech";
import SignIn from "./pages/Join/SignIn";
import Main from "./pages/Main/Main";
import News from "./pages/News/News";
import NewsPage from "./pages/News/NewsPage";
import Notice from "./pages/Notice/Notice";
import RiderLog from "./pages/RiderLog/RiderLog";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
        <Route path="/riderlog" element={<RiderLog />} />
        <Route path="/company" element={<Company />} />
        <Route path="/team" element={<Team />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsPage />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignIn />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default Router;
