import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { Footer } from "../../components/Footer";
import { Community } from "../../components/Community";
import { BrowserRouter } from "react-router-dom";
import { CommunityProvider } from "../../context/CommunityProvider";

describe("<Community/>", () => {
  test("Community component should render", () => {
    renderWithProviders(
        <CommunityProvider>
        <BrowserRouter>
        <Community/>
        </BrowserRouter>
        </CommunityProvider>
    );

    expect(screen.getByText("We’re proud of our products, and we’re really excited when we get feedback from our users.")).toBeInTheDocument();
  });
});
