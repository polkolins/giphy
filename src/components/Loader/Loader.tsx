import cx from "classnames";

import cls from "./Loader.module.sass";

interface IProps {
  className?: string;
}

const Loader = ({ className }: IProps) => {
  return (
    <div className={cx(className, cls.loader)} data-testid="loader">
      <div />
      <div />
    </div>
  )
}

export default Loader;