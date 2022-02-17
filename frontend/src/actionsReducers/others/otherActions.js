import { OPEN_SIDE_BAR, CLOSE_SIDE_BAR, SIDE_BAR_ERROR } from '../types';

export const openSide = () => async dispatch => {
  try {
    dispatch({ type: OPEN_SIDE_BAR });
  } catch (error) {
    dispatch({
      type: SIDE_BAR_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const closeSide = () => async dispatch => {
  try {
    dispatch({ type: CLOSE_SIDE_BAR });
  } catch (error) {
    dispatch({
      type: SIDE_BAR_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
