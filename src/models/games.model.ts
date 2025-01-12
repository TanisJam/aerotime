type BaseEntity = {
  id: number;
  name: string;
};


export interface Cover {
  id: number;
  url: string;
}

export interface SimilarGame extends BaseEntity {
  cover: Cover;
}

export interface Company extends BaseEntity {
  name: string;
}

export interface InvolvedCompany {
  company: Company;
}

export interface IGDBGame extends BaseEntity {
  cover: Cover;
  first_release_date: number;
  genres: BaseEntity[];
  platforms: BaseEntity[];
  rating: number;
  screenshots: Cover[];
  similar_games: SimilarGame[];
  summary: string;
  yearsAgo: number | null;
  releaseDate: string | null;
  involved_companies: InvolvedCompany[];
}
