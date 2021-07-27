import { apiKey, apiBaseUrl } from "../../../config/config";
import { FiltersType } from "../../../modules/movieListing/pages";
import { MoviesResultType } from "./MovieListingApi.types";

export const getAllMovies = async ({
  page,
  sort,
}: FiltersType): Promise<MoviesResultType> => {
  let pageNumber = page;
  if (sort == "desc") {
    pageNumber = 26 - page;
  }

  const request = await fetch(
    `${apiBaseUrl}/3/movie/top_rated?api_key=${apiKey}&page=${pageNumber}`
  );
  const data = await request.json();
  return { movies: data?.results };
};
