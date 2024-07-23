import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Pages from "./pages/Pages";
import SinglePost from "./pages/SinglePost";
import Header from "./components/layout-components/Header";
import Footer from "./components/layout-components/Footer";

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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/singlePost" element={<SinglePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
