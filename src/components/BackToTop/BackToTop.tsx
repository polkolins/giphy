import { useEffect, useState } from "react";
import cx from "classnames";
import RocketSVG from "rocket.svg";

import cls from "./BackToTop.module.sass";


const BackToTop = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleToggleState = () => {
    setVisible(window.scrollY > window.innerHeight * 0.3 + 100);
  }

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  };

  useEffect(() => {
    window.addEventListener("scroll", handleToggleState);

    return function clearScrollListener () {
      window.removeEventListener("scroll", handleToggleState)
    }
  }, []);

  return (
    <button
      onClick={handleClick}
      data-testid="back-to-top"
      className={cx(cls.backToTopButton, {
        [cls.visible]: visible
      })}
    >
      <img src={RocketSVG} alt="Back to top"/>
    </button>
  )
};

export default BackToTop;