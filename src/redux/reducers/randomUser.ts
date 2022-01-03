import { HYDRATE } from 'next-redux-wrapper';
import { AxiosError, AxiosResponse } from 'axios';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { DEFAULT_RESPONSE } from './../../constants/index';
import {
  GetRandomUserRequestType,
  GetRandomUserResponseType,
  ResultsType,
} from '../../api/randomUser';

export const actionTypes = {
  GET_RANDOM_USER_REQUEST: 'randomUser/GET_RANDOM_USER_REQUEST',
  GET_RANDOM_USER_SUCCESS: 'randomUser/GET_RANDOM_USER_SUCCESS',
  GET_RANDOM_USER_FAILURE: 'randomUser/GET_RANDOM_USER_FAILURE',
  GET_RANDOM_USER_CANCEL: 'randomUser/GET_RANDOM_USER_CANCEL',
  ADD_RANDOM_USER_BOOKMARK: 'randomUser/ADD_RANDOM_USER_BOOKMARK',
  DELETE_RANDOM_USER_BOOKMARK: 'randomUser/DELETE_RANDOM_USER_BOOKMARK',
};

export const getRandomUsersAction = createAsyncAction(
  actionTypes.GET_RANDOM_USER_REQUEST,
  actionTypes.GET_RANDOM_USER_SUCCESS,
  actionTypes.GET_RANDOM_USER_FAILURE,
  actionTypes.GET_RANDOM_USER_CANCEL,
)<
  GetRandomUserRequestType,
  GetRandomUserResponseType,
  GetRandomUserResponseType,
  any
>();

export const addRandomUserBookmarkAction = createAction(
  actionTypes.ADD_RANDOM_USER_BOOKMARK,
)<string>();

export const deleteRandomUserBookmarkAction = createAction(
  actionTypes.DELETE_RANDOM_USER_BOOKMARK,
)<string>();

export const actions = {
  getRandomUsersAction,
  addRandomUserBookmarkAction,
  deleteRandomUserBookmarkAction,
};

export type RandomUserAction = ActionType<typeof actions>;

export interface RandomUserStateType {
  getRandomUserLoading: boolean;
  getRandomUserDone: boolean;
  getRandomUserResponse: AxiosResponse;
  bookmarkList: ResultsType[];
}

export const initialState: RandomUserStateType = {
  getRandomUserLoading: false,
  getRandomUserDone: false,
  getRandomUserResponse: DEFAULT_RESPONSE,
  bookmarkList: [],
};

const RandomUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.GET_RANDOM_USER_REQUEST:
      return {
        ...state,
        getRandomUserLoading: true,
        getRandomUserDone: false,
        getRandomUserResponse:
          { ...state.getRandomUserResponse } || DEFAULT_RESPONSE,
      };
    case actionTypes.GET_RANDOM_USER_SUCCESS:
      return {
        ...state,
        getRandomUserLoading: false,
        getRandomUserDone: true,
        getRandomUserResponse: {
          ...state.getRandomUserResponse,
          data: {
            ...action.payload.data,
            results: state.getRandomUserResponse.data.results
              ? [
                  ...state.getRandomUserResponse.data.results,
                  ...action.payload.data.results,
                ]
              : [...action.payload.data.results],
          },
        },
      };
    case actionTypes.GET_RANDOM_USER_FAILURE:
      return {
        ...state,
        getRandomUserLoading: false,
        getRandomUserDone: false,
        getRandomUserResponse: { ...action.payload },
      };
    case actionTypes.GET_RANDOM_USER_CANCEL:
      return {
        getRandomUserLoading: false,
        getRandomUserDone: false,
        getRandomUserResponse: DEFAULT_RESPONSE,
        bookmarkList: [],
      };
    case actionTypes.ADD_RANDOM_USER_BOOKMARK: {
      const { results } = state.getRandomUserResponse.data;
      const findResult = results.find(
        (o: ResultsType) => o.phone === action.payload,
      );
      const resultIncludesBookmark = results.map((item: ResultsType) => {
        if (item.phone === action.payload) {
          return { ...item, isBookmark: true };
        }
        return item;
      });
      return {
        ...state,
        getRandomUserResponse: {
          data: {
            ...state.getRandomUserResponse.data,
            results: resultIncludesBookmark,
          },
        },
        bookmarkList: [...state.bookmarkList, findResult],
      };
    }
    case actionTypes.DELETE_RANDOM_USER_BOOKMARK: {
      const { getRandomUserResponse, bookmarkList } = state;
      const { results } = getRandomUserResponse.data;
      const resultIncludesBookmark = results.map((item: ResultsType) => {
        if (item.phone === action.payload) {
          return { ...item, isBookmark: false };
        }
        return item;
      });
      const filteredBookmarkList = bookmarkList.filter(
        (o: ResultsType) => o.phone !== action.payload,
      );
      return {
        ...state,
        getRandomUserResponse: {
          data: {
            ...state.getRandomUserResponse.data,
            results: resultIncludesBookmark,
          },
        },
        bookmarkList: filteredBookmarkList,
      };
    }
    default:
      return state;
  }
};

export default RandomUserReducer;
