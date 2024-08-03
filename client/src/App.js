import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Blogger from "./pages/Blogger";
import Contact from "./pages/Contact";
import SinglePost from "./pages/SinglePost";
import Header from "./components/layout-components/Header";
import Footer from "./components/layout-components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import { ScrollToTop } from "./components/general-components/ScrollToTop";

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogger/:id" element={<Blogger />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/singlePost/:id" element={<SinglePost />} />
          <Route path="/write" element={<Write />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
