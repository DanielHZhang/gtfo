
export type HouseData = {
  address: string,
  rent: {
    raw: string,
    value: number,
  },
  type: string,
  bedrooms: number,
  utilities: boolean,
  available: string,
  lease: {
    term: number,
    negotiable: boolean,
  },
  location: string,
  distance: number,
  description: string,
  images: string[],
  url: string,
  viewed: boolean,
  liked: boolean,
};
