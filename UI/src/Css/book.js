import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchBooks = async ( params ) => {
  return axios.get("/books", { params }).then((res) => res.data);
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

export function useBooksQuery(pageParams={}) {
  return useQuery({
    queryKey: ['TABLE_DATA_IMPORT', pageParams],
    queryFn: () => fetchBooks(pageParams),
    retry: false
  })
};

export function fetchUsersQuery(){
  return useQuery({
    queryKey:'users',
    queryFn: ()=> axios.get('/users').then(res=>res.data),
    _defaulted:0
  })
}