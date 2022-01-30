import { ResultsType } from '../api/randomUser';

export const resultIncludesBookmark = (
  results: ResultsType[],
  value: string,
) => {
  return results.map((item: ResultsType) => {
    if (item.phone === value) {
      return { ...item, isBookmark: true };
    }
    return item;
  });
};
