const initialState = {
    isLoggedIn: false,
  };
  
  const auth = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isLoggedIn: true,
        };
      case "LOGOUT":
        return {
          ...state,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  export default auth;