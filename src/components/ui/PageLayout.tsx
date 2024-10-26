import Footer from "@components/Footer";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <>
      <div className="mb-4">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
