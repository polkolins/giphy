import { FormEvent, memo, useState, ChangeEvent, useRef } from "react";
import cx from "classnames";
import RocketSVG from "rocket.svg";

import cls from "./SearchBox.module.sass";


export interface IProps {
  handleClick: (term: string) => void
}

const SearchBox = memo(({ handleClick }: IProps) => {
  const [term, setTerm] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const formRef = useRef<HTMLFormElement>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    /*
    * Auto-batching here
    * */

    setIsValid(true);
    setTerm(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    /*
    * Here is very primitive validation. For better validation
    * and covering more cases it's better to use libs
    * */

    if (term.trim()) {
      handleClick(term);
    } else {

      /*
      * Auto-batching here
      * */

      setTerm(term.trim());
      setIsValid(false);
    }
  }

  return (
    <form
      ref={formRef}
      className={cx(cls.control, {
        [cls.invalid]: !isValid
      })}
      onSubmit={handleSubmit}
      noValidate
      data-testid={"search-box-form"}
    >
      <input
        type="text"
        value={term}
        className={cls.input}
        onChange={handleOnChange}
        required
        placeholder="Type something..."
      />
      <button type="submit" className={cls.button}>
        <img className={cls.image} src={RocketSVG} alt="submit"/>
      </button>
    </form>
  )
});

export default SearchBox;