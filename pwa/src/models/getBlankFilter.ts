import { Filter } from "src/models/filter";

export const getBlankFilter = (): Filter => {
  const today = new Intl.DateTimeFormat("en-ZA").format(new Date());
  const todayPlusADay = new Intl.DateTimeFormat("en-ZA").format(dateCalc(-1));

  return {
    token_id: "",
    search_term: "",
    search_traits: [""],
    price_min_input: null,
    price_max_input: null,
    rarity_min_input: null,
    rarity_max_input: null,
    // today is default
    // the backend creates dates at midnight so 2023/07/03 = 2023/07/03 00:00:00 on backend
    // so to include today we need to add a day to get 2023/07/03 00:00:00 to 2023/07/04 00:00:00
    // dates: [today, todayPlusADay],
  };
};

export const dateCalc = (numberOfDaysToSubtract: number) => {
  return new Date().setDate(new Date().getDate() - numberOfDaysToSubtract);
};
