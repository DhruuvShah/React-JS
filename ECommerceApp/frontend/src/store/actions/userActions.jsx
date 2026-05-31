import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducers/userSlice";

export const asynccurrentuser = () => async (dispatch, getState) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;
        const { data } = await axios.get("/users/" + user.id);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(loaduser(data));
    } catch (error) {
        // User ID not found in backend (stale session) — clear it
        localStorage.removeItem("user");
        dispatch(removeuser());
    }
};

export const asynclogoutuser = () => async (dispatch, getState) => {
    try {
        localStorage.removeItem("user");
        dispatch(removeuser());
    } catch (error) {
        console.log(error);
    }
};

export const asyncloginuser = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(
            `/users?email=${user.email}&password=${user.password}`
        );
        if (!data[0]) return null;
        localStorage.setItem("user", JSON.stringify(data[0]));
        dispatch(loaduser(data[0]));
        return data[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const asyncregisteruser = (user) => async (dispatch, getState) => {
    try {
        await axios.post("/users", user);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const asyncupdateuser = (id, user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.patch("/users/" + id, user);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(loaduser(data));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const asyncdeleteuser = (id) => async (dispatch, getState) => {
    try {
        await axios.delete("/users/" + id);
        dispatch(asynclogoutuser());
    } catch (error) {
        console.log(error);
    }
};

export const asyncToggleWishlist = (product) => async (dispatch, getState) => {
    try {
        const { users } = getState().userReducer;
        if (!users) return false;
        const copyUser = {
            ...users,
            cart: users.cart || [],
            wishlist: [...(users.wishlist || [])],
        };
        const idx = copyUser.wishlist.findIndex((p) => p.id === product.id);
        if (idx === -1) {
            copyUser.wishlist.push(product);
        } else {
            copyUser.wishlist.splice(idx, 1);
        }
        const { data } = await axios.patch("/users/" + users.id, copyUser);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(loaduser(data));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};