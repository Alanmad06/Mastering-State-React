import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";

import { Community } from "../../components/Community";
import { BrowserRouter } from "react-router-dom";
import { CommunityProvider } from "../../context/CommunityProvider";
import { setupStore } from "../../redux/store";
import userEvent from "@testing-library/user-event";
import * as router from "react-router";

describe("<Community/>", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Esto limpia el espía entre tests
  });
  test("Community component should render", () => {
    renderWithProviders(
      <CommunityProvider>
        <BrowserRouter>
          <Community />
        </BrowserRouter>
      </CommunityProvider>
    );

    expect(
      screen.getByText(
        "We’re proud of our products, and we’re really excited when we get feedback from our users."
      )
    ).toBeInTheDocument();
  });

  test("Hide button  should distpatch when click", () => {
    const store = setupStore();
    const dispatch = jest.spyOn(store, "dispatch");

    renderWithProviders(
      <CommunityProvider>
        <BrowserRouter>
          <Community />
        </BrowserRouter>
      </CommunityProvider>,
      { store }
    );

    const button = screen.getByRole("checkbox", { name: "Hide" });

    userEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test("Back button should use useNavigate", () => {
    const mockedUsedNavigate = jest.spyOn(router, "useNavigate");

    renderWithProviders(
      <CommunityProvider>
        <BrowserRouter>
          <Community />
        </BrowserRouter>
      </CommunityProvider>
    );

    const button = screen.getByRole("button", { name: "Go Back !" });
    userEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });

  test("Community cards info should render correctly ", async () => {
    renderWithProviders(
      <CommunityProvider>
        <BrowserRouter>
          <Community />
        </BrowserRouter>
      </CommunityProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Marjy Smith")).toBeInTheDocument();
    });
  });
});
