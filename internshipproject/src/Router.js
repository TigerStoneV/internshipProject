import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavbarStar from "./components/Nav/Nav";
import Company from "./pages/Introduce/Company/Company";
import Contact from "./pages/Introduce/Contact/Contact";
import Team from "./pages/Introduce/Team/Team";
import Tech from "./pages/Introduce/Tech/Tech";
import Main from "./pages/Main/Main";
import News from "./pages/RiderLog/News/News";
import Notice from "./pages/Notice/Notice";
import RiderLog from "./pages/RiderLog/RiderLog";

const Router = () => {
  return (
    <BrowserRouter>
      <NavbarStar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/riderlog" element={<RiderLog />} />
        <Route path="/company" element={<Company />} />
        <Route path="/team" element={<Team />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/news" element={<News />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default Router;
