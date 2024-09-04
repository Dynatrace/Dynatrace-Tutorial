import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AppHeader, Page } from "@dynatrace/strato-components-preview/layouts";
import { HostList } from "./pages/HostList";
import { StatusHistory } from "./pages/StatusHistory";

export const App = () => {
  return (
    <Page>
      <Page.Header>
        <AppHeader>
          <AppHeader.NavItems>
            <AppHeader.AppNavLink as={Link} to="/" />
            <AppHeader.NavItem
              as={Link}
              to="/status-history"
              data-testid="status-history-nav"
            >
              Status History
            </AppHeader.NavItem>
          </AppHeader.NavItems>
        </AppHeader>
      </Page.Header>
      <Page.Main>
        <Routes>
          <Route path="/" element={<HostList />} />
          <Route path="/status-history" element={<StatusHistory />} />
        </Routes>
      </Page.Main>
    </Page>
  );
};
