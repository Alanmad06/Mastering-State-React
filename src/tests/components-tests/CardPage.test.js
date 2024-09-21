import { screen, waitFor, render } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import * as router from "react-router";
import { CardPage } from "../../components/CardPage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CommunityProvider } from "../../context/CommunityProvider";
import { Community } from "../../components/Community";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "../../redux/store";

function wrapper({ children }) {
  const store = setupStore()
  return (
    <MemoryRouter initialEntries={["/community"]}>
      <CommunityProvider >
        <Provider store={store}>
        {children}
        </Provider>
        </CommunityProvider>
    </MemoryRouter>
  );
}

describe("<CardPage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("CardPage component should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <CardPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Go Back !N")).toBeInTheDocument();
  });

  test("Click on card should navigate to other page", async () => {
    renderWithProviders(
      <CommunityProvider>
        <BrowserRouter>
          <Community />
        </BrowserRouter>
      </CommunityProvider>
    );
    renderWithProviders(
      <BrowserRouter>
        <CardPage />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Go Back !N" });

    userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(
          "We’re proud of our products, and we’re really excited when we get feedback from our users."
        )
      ).toBeInTheDocument();
    });
    /* expect(mockedUsedNavigate).toHaveBeenCalledTimes(1); */
  });

  test("Should fecth data and change state correctly", async () => {
    //Test Use Navigate without mocking it 
    render(
      <Routes>
        <Route path="/community" element={<Community></Community>}></Route>
        <Route path="/community/:id" element={<CardPage></CardPage>}></Route>
      </Routes>,

      { wrapper }
    );
    let card;
    screen.debug();
    await waitFor(() => {
      card = screen.getByText("Lead Designer at Company Name");
    });

    userEvent.click(card);
    await waitFor(() => {
      expect(screen.getByText("Loading ...")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.getByText("Lead Designer at Company Name")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    screen.debug();
  });
});
