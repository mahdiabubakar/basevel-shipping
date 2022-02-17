import { SIDE_BAR_ERROR, OPEN_SIDE_BAR, CLOSE_SIDE_BAR } from '../types';

export const sideReducers = (state = {}, action) => {
  switch (action.type) {
    case OPEN_SIDE_BAR:
      return { loading: false, sideOpen: true };
    case CLOSE_SIDE_BAR:
      return { loading: false, sideOpen: false };
    case SIDE_BAR_ERROR:
      return {
        loading: false,
        sideOpen: false,
      };
    default:
      return state;
  }
};
