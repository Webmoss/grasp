export interface Filter {
  token_id: string | null;
  search_term: string;
  time_frame: string;
  search_types: string[];
  search_categories: string[];
  search_traits: string[];
  price_min_input?: string | null;
  price_max_input?: string | null;
  rarity_min_input?: string | null;
  rarity_max_input?: string | null;
};
