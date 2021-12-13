import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBox } from "components";
import { IProps } from "components/SearchBox/SearchBox";

const mockProps: IProps = {
  handleClick: jest.fn(),
}

describe("SearchBox", () => {
  test("should renders correctly", () => {
    render(<SearchBox {...mockProps}/>);
    expect(screen.queryByTestId("search-box-form")).toBeTruthy();
  });

  test("should submit non-empty string", () => {
    render(<SearchBox {...mockProps}/>);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: 'value' } });
    fireEvent.click(screen.getByRole("button"));
    expect(mockProps.handleClick).toBeCalledTimes(1);
  });

  test("should not submit empty string", () => {
    render(<SearchBox {...mockProps}/>);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: ' ' } });
    fireEvent.click(screen.getByRole("button"));
    expect(mockProps.handleClick).toBeCalledTimes(0);
    expect(screen.queryByTestId("search-box-form")).toHaveClass("control invalid");
  });
});