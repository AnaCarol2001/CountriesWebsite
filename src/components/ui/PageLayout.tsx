import Footer from "@components/Footer";
import Header from "@components/Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

const PageLoading = () => {
  return (
    <div className="grid place-content-center">
      <h1 className="sr-only">Loading...</h1>
      <div className="flex gap-5">
        <div className="animate-ping circle bg-dark-elements border-dark-elements"></div>
        <div className="animate-ping-75ms circle bg-dark-elements border-dark-elements"></div>
        <div className="animate-ping-100ms circle bg-dark-elements border-dark-elements"></div>
      </div>
    </div>
  );
};
