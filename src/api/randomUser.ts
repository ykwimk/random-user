import { fetchApi } from '.';

export interface GetRandomUserRequestType {
  results?: number;
}

export interface GetRandomUserResponseType {
  data: GetRandomUserResponseDataType;
}

export interface GetRandomUserResponseDataType {
  results: ResultsType[];
  info: InfoType;
}

export interface InfoType {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface ResultsType {
  gender: string;
  name: NameType;
  location: LocationType;
  email: string;
  login: LoginType;
  dob: DobType;
  registered: DobType;
  phone: string;
  cell: string;
  id: IdType;
  picture: PictureType;
  nat: string;
}

export interface DobType {
  date: Date;
  age: number;
}

export interface IdType {
  name: string;
  value: string;
}

export interface LocationType {
  street: string;
  city: string;
  state: string;
  postcode: string;
  coordinates: CoordinatesType;
  timezone: TimezoneType;
}

export interface CoordinatesType {
  latitude: string;
  longitude: string;
}

export interface TimezoneType {
  offset: string;
  description: string;
}

export interface LoginType {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface NameType {
  title: string;
  first: string;
  last: string;
}

export interface PictureType {
  large: string;
  medium: string;
  thumbnail: string;
}

export const getRandomUser = ({ results }: GetRandomUserRequestType) => {
  return fetchApi({
    url: '/api/',
    method: 'GET',
    data: results,
  });
};
