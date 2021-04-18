import axios from 'axios';
import {ICrudSearchAction} from 'react-jhipster';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';

import {defaultValue, IKeyManagementView} from "app/shared/model/key-management.model";
import {ITranslation} from "app/shared/model/translation.model";

export const ACTION_TYPES = {
  FETCH_KEY_MANAGEMENT_VIEW_LIST: 'keyManagementView/FETCH_KEY_MANAGEMENT_VIEW_LIST',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKeyManagementView>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  translations: [] as ITranslation[]
};

export type KeyManagementViewState = Readonly<typeof initialState>;

// Reducer

export default (state: KeyManagementViewState = initialState, action): KeyManagementViewState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KEY_MANAGEMENT_VIEW_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_KEY_MANAGEMENT_VIEW_LIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_KEY_MANAGEMENT_VIEW_LIST): {
      const data = action.payload.data[0];
      const translations = !data ? [] : data;
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        translations
      };
    }
    default:
      return state;
  }
};

const apiUrl = 'api/key-management-view';

// Actions

export const getEntitiesForProject: ICrudSearchAction<IKeyManagementView> = (search, page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_KEY_MANAGEMENT_VIEW_LIST,
    payload: axios.get<IKeyManagementView>(`${requestUrl}${sort ? '&' : '?'}${search}cacheBuster=${new Date().getTime()}`),
  };
};

