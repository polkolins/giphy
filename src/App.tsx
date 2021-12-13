import { memo, useCallback, useContext, useMemo, useState } from 'react';
import ReactDOM from "react-dom";
import { Grid } from '@giphy/react-components';
import { IGif } from "@giphy/js-types";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import memoize from "fast-memoize";
import { apiService } from "api/api";
import { GifsContext } from "context/gifsProvider";
import { ModalContext } from "context/modalProvider";
import { SearchBox, BackToTop, Gif, GifContainer, Loader } from "components";

import cls from "./App.module.sass";


const breakpointColumnsObj = {
  default: 3,
  768: 2,
  480: 1
};

function App() {
  const gifsContext = useContext(GifsContext);
  const modalContext = useContext(ModalContext);

  const { gifs, pager, hasMore, term, isFetching } = gifsContext;

  /*
  * I've decided to go here with local state but it could be done
  * also via context (or any other state mgmt)
  * */
  const [notFound, setNotFound] = useState<boolean>(false);

  const fetchGifs = async (clear: boolean, term: string) => {
    gifsContext.fetchingHandler(true);

    try {
      const { data, pagination } = await apiService.getGifsByTerm(term, pager.offset);

      setNotFound(data.length === 0);

      /*
      * Officially batched state update is not working automatically
      * for some situations (including async actions), so that is why
      * we need to do this manually with ReactDOM.unstable_batchedUpdates.
      * It should be automatically from React version 18.
      * Check https://github.com/reactwg/react-18/discussions/21 for more info.
      * */

      ReactDOM.unstable_batchedUpdates(() => {
        gifsContext.fetchingHandler(false);
        gifsContext.termHandler(term);
        gifsContext.gifsHandler([
          ...(clear ? [] : gifs),
          ...data
        ]);
        gifsContext.pagerHandler({
          ...pagination,
          offset: pagination.offset + pagination.count
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchClick = useCallback((term: string) => {
    fetchGifs(true, term);
  }, []);

  const handleScroll = (term: string) => {
    fetchGifs(false, term);
  };

  /*
  * To avoid re-rendering of GIF component inside map function we need to memoize
  * it with useCallback, but there is an issue with handleImageClick(gif) returns
  * new function each render. To avoid such behavior we need to additionally
  * memoize function inside useCallback. But also using useCallback in this
  * situation will rise a warning with unknown dependencies. To avoid that
  * warning we can use useMemo instead of useCallback.
  * */
  const handleImageClick = useMemo(
    () =>
      memoize(
        (gif: IGif) => () => modalContext.modalHandler(true, <GifContainer gif={gif} />)
      ), []
    );

  return (
    <div className={cls.app}>
      <SearchBox handleClick={handleSearchClick}/>

      {notFound && (
        <p className={cls.error}>
          Please, try to find something sensible
        </p>
      )}

      {isFetching && <Loader />}

      <InfiniteScroll
        dataLength={gifs.length}
        next={() => handleScroll(term)}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={cls.masonry}
          columnClassName={cls.masonryColumn}
        >
          {gifs.map(gif => (
            <Gif
              key={gif.id}
              title={gif.title}
              url={gif.images["480w_still"].url}
              isStill
              className={cls.masonryImage}
              onClick={handleImageClick(gif)}
            />
          ))}
        </Masonry>
      </InfiniteScroll>

      <BackToTop />

       {/*This is default usage of Giphy components, just for fun :)*/}
      {gifs.length === 0 && (
        <Grid
          className={cls.placeholder}
          width={800}
          columns={3}
          fetchGifs={apiService.getGifsTrended}
        />
      )}
    </div>
  );
}

export default memo(App);