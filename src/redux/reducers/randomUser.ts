import { HYDRATE } from 'next-redux-wrapper';
import produce, { enableES5 } from 'immer';
import _ from 'lodash';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { DefaultResponseType } from './../../types/index';
import { DEFAULT_RESPONSE } from './../../constants/index';
import {
  GetRandomUserRequestType,
  GetRandomUserResponseType,
  ResultsType,
} from '../../api/randomUser';
import { resultIncludesBookmark } from '../../utils';

enableES5();

export const actionTypes = {
  GET_RANDOM_USER_REQUEST: 'randomUser/GET_RANDOM_USER_REQUEST',
  GET_RANDOM_USER_SUCCESS: 'randomUser/GET_RANDOM_USER_SUCCESS',
  GET_RANDOM_USER_FAILURE: 'randomUser/GET_RANDOM_USER_FAILURE',
  GET_RANDOM_USER_CANCEL: 'randomUser/GET_RANDOM_USER_CANCEL',
  ADD_RANDOM_USER_BOOKMARK: 'randomUser/ADD_RANDOM_USER_BOOKMARK',
  DELETE_RANDOM_USER_BOOKMARK: 'randomUser/DELETE_RANDOM_USER_BOOKMARK',
  SEARCH_RANDOM_USER: 'randomUser/SEARCH_RANDOM_USER',
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

export const searchRandomUserAction = createAction(
  actionTypes.SEARCH_RANDOM_USER,
)<string>();

export const actions = {
  getRandomUsersAction,
  addRandomUserBookmarkAction,
  deleteRandomUserBookmarkAction,
  searchRandomUserAction,
};

export type RandomUserAction = ActionType<typeof actions>;

export interface RandomUserStateType {
  getRandomUserLoading: boolean;
  getRandomUserDone: boolean;
  getRandomUserResponse: DefaultResponseType;
  bookmarkList: ResultsType[];
  searchList: ResultsType[];
}

export const initialState: RandomUserStateType = {
  getRandomUserLoading: false,
  getRandomUserDone: false,
  getRandomUserResponse: DEFAULT_RESPONSE,
  bookmarkList: [],
  searchList: [],
};

const RandomUserReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      case actionTypes.GET_RANDOM_USER_REQUEST: {
        draft.getRandomUserLoading = true;
        draft.getRandomUserDone = false;
        draft.getRandomUserResponse =
          { ...state.getRandomUserResponse } || DEFAULT_RESPONSE;
        break;
      }
      case actionTypes.GET_RANDOM_USER_SUCCESS: {
        draft.getRandomUserLoading = false;
        draft.getRandomUserDone = true;
        draft.getRandomUserResponse = {
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
        };
        break;
      }
      case actionTypes.GET_RANDOM_USER_FAILURE: {
        draft.getRandomUserLoading = false;
        draft.getRandomUserDone = false;
        draft.getRandomUserResponse = { ...action.payload };
        break;
      }
      case actionTypes.GET_RANDOM_USER_CANCEL: {
        draft.getRandomUserLoading = false;
        draft.getRandomUserDone = false;
        draft.getRandomUserResponse = DEFAULT_RESPONSE;
        draft.searchList = [];
        break;
      }

      case actionTypes.ADD_RANDOM_USER_BOOKMARK: {
        const { results } = state.getRandomUserResponse.data;
        const findResult = results.find(
          (o: ResultsType) => o.phone === action.payload,
        );

        draft.getRandomUserResponse = {
          ...state.getRandomUserResponse,
          data: {
            ...state.getRandomUserResponse.data,
            results: [...resultIncludesBookmark(results, action.payload)],
          },
        };
        draft.bookmarkList = [
          ...state.bookmarkList,
          { ...findResult, isBookmark: true },
        ];
        draft.searchList = [
          ...resultIncludesBookmark(state.searchList, action.payload),
        ];
        break;
      }

      case actionTypes.DELETE_RANDOM_USER_BOOKMARK: {
        const { getRandomUserResponse, bookmarkList } = state;
        let asResults: ResultsType[] = [];

        if (!_.isEmpty(getRandomUserResponse.data)) {
          const { results } = getRandomUserResponse.data;
          asResults = results.map((item: ResultsType) => {
            if (item.phone === action.payload) {
              return { ...item, isBookmark: false };
            }
            return item;
          });
        }

        const filteredBookmarkList = bookmarkList.filter(
          (o: ResultsType) => o.phone !== action.payload,
        );

        draft.getRandomUserResponse = {
          ...state.getRandomUserResponse,
          data: {
            ...state.getRandomUserResponse.data,
            results: asResults || [...state.getRandomUserResponse.data.results],
          },
        };
        draft.bookmarkList = filteredBookmarkList;
        break;
      }

      case actionTypes.SEARCH_RANDOM_USER: {
        const { results } = state.getRandomUserResponse.data;
        const filteredList = results.filter((o: ResultsType) => {
          const { name } = o;
          const fullName = `${name.title}. ${name.first} ${name.last}`;
          return fullName
            .toLocaleLowerCase()
            .trim()
            .includes(action.payload.toLocaleLowerCase().trim());
        });
        draft.searchList = action.payload ? [...filteredList] : [];
        break;
      }

      default:
        break;
    }
  });

export default RandomUserReducer;
