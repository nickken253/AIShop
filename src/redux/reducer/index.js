import handleCart from './handleCart'
import auth from './auth';
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    handleCart,
    auth,
})
export default rootReducers