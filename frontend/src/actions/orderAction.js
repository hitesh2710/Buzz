import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  CLEAR_ERRORS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_FAIL,
  ADMIN_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
} from "../constants/orderConstant";
import axios from "axios";
import { BACKEND } from "../backend_url.js";
// Create New Order
export const newOrder = (orderDetail) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BACKEND}/api/v1/order/new`,
      orderDetail,
      config
    );
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

// Get LoggedIn User Order

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const { data } = await axios.get(`${BACKEND}/api/v1/order/me`);

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message });
  }
};

// Get Order Details
export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });
    const { data } = await axios.get(`${BACKEND}/api/v1/order/${id}`);

    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: ORDER_DETAIL_FAIL, payload: error.response.data.message });
  }
};

// Get All the order(Admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ORDER_REQUEST });
    const { data } = await axios.get(`${BACKEND}/api/v1/admin/orders`);

    dispatch({ type: ADMIN_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: ADMIN_ORDER_FAIL, payload: error.response.data.message });
  }
};
// Update Order
export const updateOrder = (id, orderDetail) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${BACKEND}/api/v1/admin/order/${id}`,
      orderDetail,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`${BACKEND}/api/v1/admin/order/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
