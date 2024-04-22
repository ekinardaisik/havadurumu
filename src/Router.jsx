import { Outlet, createBrowserRouter } from 'react-router-dom';
import Header from './Layout/Header';
import Home from './pages/Home';
import Footer from './Layout/Footer';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import City from './pages/City';

export const pages = [
  {
    path: "/",
    element: <Home />,
    title: "Ana Sayfa"
  },
  {
    path: "sehir/:id",
    element: <City />
  },
  {
    path: "hakkimizda",
    element: <AboutUs />,
    title: "Hakkımızda"
  },
  {
    path: "iletisim",
    element: <Contact />,
    title: "İletişim"
  }
]

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: pages
  },
]);

export default router;
