import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  UserProvider,
  UserContext,
  UserContextType,
} from "../contexts/UserContext";
import { mockUser } from "./mockUser";

function render(
  ui: React.ReactElement,
  renderOptions: { providerProps?: Partial<UserContextType> } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <UserProvider>
        <Router>
          <UserContext.Provider
            value={{
              user: mockUser,
              login: jest.fn(),
              logout: jest.fn(),
              ...renderOptions.providerProps,
            }}
          >
            {children}
          </UserContext.Provider>
        </Router>
      </UserProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };