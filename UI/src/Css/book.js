import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBooks = async ({
  pageParam = { page: 1, page_size: 10, search_column: "", search_value: "" },
}) => {
  const res = await axios.get("/books", { params: pageParam });
  return res.data;
};

export const useBooks = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["books"],
      queryFn: fetchBooks,
      getNextPageParam: (lastPage) => lastPage.nextPageParams || undefined,
    });
  return {
    data: data?.pages.flatMap((page) => page.results) || [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
