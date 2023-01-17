import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";

export const Layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
