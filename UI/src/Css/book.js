import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBooks = async ({
  pageParam = { page: 1, page_size: 10, search_column: "", search_value: "" },
}) => {
  return axios.get("/books", { params: pageParam }).then((res) => res.data);
};

export const useBooks = (pageParams={}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, fetchPreviousPage } =
    useInfiniteQuery({
      queryKey: ["books"],
      queryFn:()=> fetchBooks(pageParams),
      getNextPageParam: (lastPage) => lastPage.nextPageParams || undefined,
    });
  console.log(data, 'datssssa'); // This will log the data from the query
  return {
    data: data?.pages.flatMap((page) => page.books) || [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage
  };
};
