import { render, screen, fireEvent } from "@testing-library/react";
import { BackToTop } from "components";

describe("BackToTop", () => {
  test("should renders properly", () => {
    render(<BackToTop/>);
    expect(screen.getByTestId("back-to-top")).toBeTruthy();
  });

  describe("should toggle visibility", () => {
    let element: HTMLElement;

    beforeEach(() => {
      global.scrollTo = () => fireEvent.scroll(window, { target: { scrollY: 0 } });
      render(<BackToTop/>);
      element = screen.getByTestId("back-to-top");
    })

    test("on scroll", () => {
      expect(element).toHaveClass("backToTopButton")
      fireEvent.scroll(window, { target: { scrollY: 500 } });
      expect(element).toHaveClass("backToTopButton visible");
    });

    test("on click", () => {
      fireEvent.scroll(window, { target: { scrollY: 500 } });
      expect(element).toHaveClass("backToTopButton visible");
      fireEvent.click(element);
      expect(element).toHaveClass("backToTopButton");
    });
  });
});