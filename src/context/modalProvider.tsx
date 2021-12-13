import {
  useState,
  createContext,
  FC,
  useEffect,
  ReactElement,
  useCallback,
} from "react";
import { Modal } from "components";

interface IContext {
  content: ReactElement | null,
  isModalOpen: boolean,
  modalHandler: (isOpen: boolean, content: ReactElement) => void,
}

export const ModalContext = createContext<IContext>({
  content: null,
  isModalOpen: false,
  modalHandler: () => {},
});

/*
* I prefer to use Modals as services and to have only one instance of it
* and pass content dynamically. I faced a lot with issue when a lot of
* instances on Modals are implemented and it's hard to manage all of them
* and BTW is there any reason to have opened more then 1 modal at once? :)
* */

const ModalProvider: FC = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactElement | null>(null);

  const modalHandler = useCallback((isOpen: boolean, content: ReactElement | null) => {

    /*
    * Auto-batching here
    * */

    setIsModalOpen(isOpen);
    setContent(content)
  }, []);

  const keydownHandler = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape": {
        modalHandler(false, null);
      }
    }
  }

  useEffect(() => {
    document.body.classList.toggle("modal-open", isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);

    return function clearKeydownListener () {
      window.removeEventListener("keydown", keydownHandler)
    }
  }, []);

  return (
    <ModalContext.Provider
      value={{
        content,
        isModalOpen,
        modalHandler,
      }}
    >
      {children}
      <Modal isOpen={isModalOpen} onClose={modalHandler}>
        {content}
      </Modal>
    </ModalContext.Provider>
  )
}

export default ModalProvider;