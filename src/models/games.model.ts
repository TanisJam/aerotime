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
  first_release_date: number | null;
  genres: BaseEntity[];
  platforms: BaseEntity[];
  rating: number;
  screenshots: Cover[];
  similar_games: SimilarGame[];
  summary: string;
  yearsAgo: number | null;
  involved_companies: InvolvedCompany[];
}

export interface SavedGame
  extends Pick<IGDBGame, 'id' | 'name' | 'first_release_date'> {
  image: string;
  savedAt: number;
}

export enum SortType {
  LAST_ADDED = 'last-added',
  NEWEST = 'newest',
  OLDEST = 'oldest'
}
