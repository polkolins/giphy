import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "components";
import { IProps } from "components/Modal/Modal";

const mockProps: IProps = {
  isOpen: false,
  onClose: jest.fn(),
  children: <div>Children</div>
}

describe("Modal", () => {
  test("should be closed", () => {
    render(
      <Modal {...mockProps}>
        <div>Children</div>
      </Modal>
    );
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  test("should be opened", () => {
    render(
      <Modal {...mockProps} isOpen={true}>
        <div>Children</div>
      </Modal>
    );
    expect(screen.getByTestId("modal")).toBeTruthy();
  });

  test("should close on click", () => {
    let isOpen = true;

    const handleClose = () => {
      isOpen = false;
    }

    const component = (isOpen: boolean) => (
      <Modal {...mockProps} isOpen={isOpen} onClose={handleClose}>
        <div>Children</div>
      </Modal>
    )

    const { rerender } = render(component(isOpen));

    fireEvent.click(screen.getByTestId("modal-container"));
    rerender(component(isOpen))
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});