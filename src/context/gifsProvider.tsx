import { useState, createContext, FC, useEffect } from "react";
import { IGif } from "@giphy/js-types";

interface IContext {
  term: string,
  gifs: IGif[],
  pager: IPagination,
  hasMore: boolean,
  isFetching: boolean,
  termHandler: (term: string) => void,
  gifsHandler: (gifs: IGif[]) => void,
  pagerHandler: (pager: IPagination) => void,
  hasMoreHandler: (hasMore: boolean) => void,
  fetchingHandler: (isFetching: boolean) => void,
}

export interface IPagination {
  count: number
  total_count: number
  offset: number
}

const initialPagination = {
  count: 0,
  total_count: 0,
  offset: 0,
}

export const GifsContext = createContext<IContext>({
  term: "",
  gifs: [],
  pager: initialPagination,
  hasMore: false,
  isFetching: false,
  termHandler: () => {},
  gifsHandler: () => {},
  pagerHandler: () => {},
  hasMoreHandler: () => {},
  fetchingHandler: () => {},
});

/*
* Application is relatively small so I decided not to use
* advanced state mgmt (like Redux or so). I didn't know if
* you expect to see Redux implementation here so I choose
* the quickest way
* */

const GifsProvider: FC = ({ children }) => {
  const [term, setTerm] = useState<string>("");
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [pager, setPager] = useState<IPagination>(initialPagination);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const termHandler = (term: string) => { setTerm(term) };
  const gifsHandler = (gifs: IGif[]) => { setGifs(gifs) };
  const pagerHandler = (pager: IPagination) => { setPager(pager) };
  const hasMoreHandler = (hasMore: boolean) => { setHasMore(hasMore) };
  const fetchingHandler = (isFetching: boolean) => { setIsFetching(isFetching) };

  useEffect(() => {
    hasMoreHandler(gifs.length !== pager.total_count);
  }, [gifs, pager]);

  return (
    <GifsContext.Provider
      value={{
        term,
        gifs,
        pager,
        hasMore,
        isFetching,
        termHandler,
        gifsHandler,
        pagerHandler,
        hasMoreHandler,
        fetchingHandler
      }}
    >
      {children}
    </GifsContext.Provider>
  )
}

export default GifsProvider;