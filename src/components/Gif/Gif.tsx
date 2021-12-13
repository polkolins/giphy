import { memo, useState, useEffect } from "react";
import cx from "classnames";
import { Loader } from "components";

import cls from "./Gif.module.sass";


export interface IProps {
  title: string,
  url: string;
  isStill?: boolean,
  onClick?: () => void,
  className?: string
}

const Gif = memo(({
  url,
  title,
  isStill,
  onClick,
  className
}: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnLoad = () => {
    setIsLoading(false);
  }

  const handleClick = () => {
    onClick && onClick();
  }

  useEffect(() => {
    setIsLoading(true);
  }, [])

  return (
    <div
      onClick={handleClick}
      className={cx(cls.gif, className)}
      data-testid={`${url}-container`}
    >
      {isLoading && (
        <Loader
          className={cx({
            [cls.loader]: !isStill
          })}
        />
      )}

      <img
        data-testid={`${url}-img`}
        src={url}
        alt={title}
        className={cls.image}
        onLoad={handleOnLoad}
        onError={handleOnLoad}
      />
    </div>
  )
});

export default Gif;