import styled from "styled-components";
import Header from "./header";
import { Outlet } from "react-router-dom";

const Main = styled.div`
  /* Add top padding equal to header height (e.g., 80px) */
  padding-top: 80px;

  /* Optional: make sure content doesn't overflow horizontally */
  overflow-x: hidden;
`;

export default function Layout() {
  return (
    <Main>
      <Header />
      <Outlet />
    </Main>
  );
}
