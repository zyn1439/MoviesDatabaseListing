import moment from "moment";
import React from "react";
import { imageBaseUrl, movieDBLink } from "../../../../config/config";
import { StarFilled, HeartTwoTone, LinkOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";

type PropsType = {
  title: string;
  voteAverage: number;
  image: string;
  releaseDate: string;
  movieId: number;
  isFavourite: boolean;
  addToFavorite: (id: number) => void;
  removeFromFavourite: (id: number) => void;
};

export const MovieCard: React.FC<PropsType> = ({
  title,
  voteAverage,
  image,
  releaseDate,
  movieId,
  isFavourite,
  addToFavorite,
  removeFromFavourite,
}) => {
  const router = useRouter();

  return (
    <div className={`movieCard ${isFavourite ? "favouriteMovie" : ""}`}>
      <div className="contentDiv">
        <div className="imageContainer">
          <img className="cardImg" src={`${imageBaseUrl}/${image}`} />
        </div>
        <div className="movieDetailsDiv">
          <div className="titleDiv">
            <h5 className="movieTitle">
              {title}
              <span className="movieYear">{`(${moment(releaseDate).format(
                "YYYY"
              )})`}</span>{" "}
              <a href={`${movieDBLink}/${movieId}`} target="_blank">
                <LinkOutlined className="linkIcon" />
              </a>
            </h5>
          </div>
          <p className="currentRatingLabel">Current Rating</p>
          <div className="ratingDiv">
            <StarFilled className="starIcon" />
            <span className="voteAverage">{voteAverage}</span>
          </div>
        </div>
      </div>
      <div
        className="favoriteDiv"
        onClick={() =>
          isFavourite ? removeFromFavourite(movieId) : addToFavorite(movieId)
        }
      >
        <HeartTwoTone
          twoToneColor={`${isFavourite ? "red" : "#e4e4e4"}`}
          className="favIcon"
        />
        <span className="favoriteText">
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </span>
      </div>
    </div>
  );
};
