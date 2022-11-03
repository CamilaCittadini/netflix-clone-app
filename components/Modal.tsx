import {
  ExclamationCircleIcon,
  HandThumbUpIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import MuiModal from "@mui/material/Modal";
import { useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { modalState, movieState } from "../atoms/modalAtom";
import { Element, Movie } from "../typings";
import ReactPlayer from "react-player/lazy";
import { MovieDataResponse, VideoResponse } from "../typings";
import { FaPlay } from "react-icons/fa";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const fetchMovieData = () => {
    return axios.get<any, AxiosResponse<MovieDataResponse>>(
      `https://api.themoviedb.org/3/${
        movie?.media_type === "tv" ? "tv" : "movie"
      }/${movie?.id}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&append_to_response=videos`
    );
  };

  const { data, isSuccess } = useQuery("movieURL", fetchMovieData);

  const filteredData = useMemo(() => {
    if (isSuccess && data?.data?.videos?.results?.length === 0) {
      setError(true);
      return { key: "" };
    }
    setError(false);

    return (
      filterByType("Trailer", data?.data) ||
      filterByType("Teaser", data?.data) ||
      filterByType("Bloopers", data?.data) ||
      filterByType("Clip", data?.data) ||
      filterByType("Featurette", data?.data) ||
      filterByType("Behind the Scenes", data?.data)
    );
  }, [data]);

  console.log("data", data);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          {error ? (
            <div className="text-2xl absolute !px-auto top-1/2 left-1/4 right-1/4 items-center flex justify-center space-x-2">
              <ExclamationCircleIcon className="h-7 w-7" />
              <p>The trailer is not available</p>
            </div>
          ) : (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${filteredData?.key}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              muted={muted}
            />
          )}
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {data?.data?.vote_average
                  ? Math.ceil(data?.data?.vote_average * 10)
                  : 0}
                % Match
              </p>
              <p className="font-light">
                {data?.data?.release_date || data?.data?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{data?.data?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {data?.data?.genres?.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original language: </span>
                  {data?.data?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {data?.data?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export { Modal };

const filterByType = (
  type: Element["type"],
  data: MovieDataResponse | undefined
) => {
  return data?.videos?.results?.find((video) => video.type === type);
};
