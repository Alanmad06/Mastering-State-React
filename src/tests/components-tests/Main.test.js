import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { Main } from "../../components/Main";

describe("<Main/>", () => {
  test("Main component should render", () => {
    renderWithProviders(<Main />);
    screen.debug();
    expect(screen.getByText("LOGO")).toBeInTheDocument();
  });
});
