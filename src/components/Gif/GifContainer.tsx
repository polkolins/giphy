import { IGif } from "@giphy/js-types";
import { Gif } from "components";

import cls from "./Gif.module.sass";


interface IProps {
  gif: IGif
}

const GifContainer = ({ gif }: IProps) => {
  return (
    <div className={cls.container}>
      <Gif url={gif.images.original.webp} title={gif.title}/>
      <Gif url={gif.images.downsized.url} title={gif.title}/>
      <Gif url={gif.images.fixed_width.webp} title={gif.title}/>
      <Gif url={gif.images.fixed_height.webp} title={gif.title}/>
    </div>
  )
}

export default GifContainer;