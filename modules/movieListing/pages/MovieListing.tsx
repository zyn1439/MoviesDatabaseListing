import { useRouter } from "next/dist/client/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMovies } from "../../../pages/api/movieListingApi/MovieListingApi";
import { MoviesResultType } from "../../../pages/api/movieListingApi/MovieListingApi.types";
import { MovieCard } from "../components/MovieCard/MovieCard";
import { Pagination, Radio } from "antd";
import CardSkeleton from "../components/LoadingIndicator/LoadingIndicator";

export type FiltersType = {
  page: number;
  sort: string;
};

type FavouritesType = {
  id: number;
};

export const MovieListing: React.FC = () => {
  const hasFavourites = process.browser && localStorage.getItem("favMovies");
  const [filters, setFilters] = useState<FiltersType>({ page: 1, sort: "asc" });
  const [allMovies, setAllMovies] = useState<MoviesResultType | undefined>();
  const [favourites, setFavourites] = useState<FavouritesType[] | undefined>(
    hasFavourites && JSON.parse(hasFavourites)
  );
  const router = useRouter();
  const queryString = router.query;

  useEffect(() => {
    getAllMovies(filters).then((result) => {
      if (filters.sort == "desc") {
        setAllMovies({ movies: result?.movies?.reverse() });
      } else {
        setAllMovies(result);
      }
    });
  }, [filters]);

  useEffect(() => {
    if (queryString) {
      const page = queryString.page ? JSON.stringify(queryString.page) : null;
      const sort = queryString.sort ? JSON.stringify(queryString.sort) : null;
      setFilters({
        page: page ? parseInt(JSON.parse(page)) : 1,
        sort: sort ? JSON.parse(sort) : "asc",
      });
    }
  }, [queryString]);

  const handlePageChange = (page: number): void => {
    router.push({
      query: {
        ...queryString,
        page,
      },
    });
  };

  const handleSortingChange = (sort: string): void => {
    router.push({
      query: {
        ...queryString,
        sort,
      },
    });
  };

  const addToFavourite = (id: number): void => {
    let newArr = favourites || [];
    if (favourites) {
      newArr.push({ id });
      localStorage.setItem("favMovies", JSON.stringify(newArr));
      setFavourites([...favourites]);
    } else {
      newArr.push({ id });
      localStorage.setItem("favMovies", JSON.stringify(newArr));
      setFavourites(newArr);
    }
  };

  const removeFromFavourites = (id: number): void => {
    const filteredFavourites = favourites?.filter((item) => item.id !== id);
    if (filteredFavourites)
      localStorage.setItem("favMovies", JSON.stringify(filteredFavourites));
    setFavourites(filteredFavourites);
  };

  const checkFavourites = (id: number) => {
    if (favourites?.find((item) => item.id === id)) return true;
    else return false;
  };

  return (
    <div className="mainDiv">
      <div className="header">
        <div>
          <p className="brandName">TMDB Chart</p>
          <p className="brandSubtitle">Top Rated Movies</p>
        </div>
        <Radio.Group
          defaultValue={filters.sort}
          onChange={(e) => handleSortingChange(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="asc">Assending</Radio.Button>
          <Radio.Button value="desc">Decending</Radio.Button>
        </Radio.Group>
      </div>
      {allMovies ? (
        <>
          {allMovies.movies?.map((item, index) => (
            <MovieCard
              key={index}
              title={item.title}
              voteAverage={item.vote_average}
              releaseDate={item.release_date}
              image={item.poster_path}
              movieId={item.id}
              addToFavorite={addToFavourite}
              removeFromFavourite={removeFromFavourites}
              isFavourite={checkFavourites(item.id)}
            />
          ))}

          <Pagination
            onChange={(page) => handlePageChange(page)}
            current={filters.page}
            defaultCurrent={1}
            pageSize={20}
            total={500}
            showSizeChanger={false}
            className="pagination"
          />
        </>
      ) : (
        <CardSkeleton />
      )}
    </div>
  );
};
