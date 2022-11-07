export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Element {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}

export interface MovieDataResponse {
  videos: { results: VideoResponse[] | undefined };
  vote_average: number;
  release_date: string;
  first_air_date: string;
  overview: string;
  genres: Genre[];
  original_language: string;
  vote_count: number;
}

export interface VideoResponse {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: Date;
  site: string;
  size: number;
  type: Element["type"];
}

export interface NetflixPlans {
  type: string;
  videoQuality: string;
  resolution: string;
  price: string;
  portability: boolean;
}
