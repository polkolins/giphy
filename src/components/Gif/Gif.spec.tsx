import { render, screen, fireEvent } from "@testing-library/react";
import { Gif } from "components";
import { IProps } from "components/Gif/Gif";

const mockProps: IProps = {
  title: "title",
  url: "url",
  onClick: jest.fn(),
};

describe("Gif", () => {
  test("should renders properly", () => {
    render(<Gif {...mockProps}/>);
    expect(screen.getByTestId("url-container")).toBeTruthy();
    expect(screen.getByTestId("url-img")).toBeTruthy();
  });

  test("should get alt and src from props", () => {
    render(<Gif {...mockProps}/>);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'url');
    expect(img).toHaveAttribute('alt', 'title');
  })

  test("should trigger callback on click", () => {
    render(<Gif {...mockProps}/>);
    fireEvent.click(screen.getByTestId("url-container"));
    expect(mockProps.onClick).toBeCalledTimes(1);
  })
});