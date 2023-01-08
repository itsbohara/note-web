import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
// utils
import http from "client/axios";
import { isValidToken, setSession } from "utils/jwt";

import { b64EncodeUnicode } from "../../utils/conversion";

// ----------------------------------------------------------------------

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<any>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const user = await getCurrentUser();

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
        // force logout on login failed
        logout();
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const { data } = await http.post("/account/login", { email, password });
    setSession(data.token);
    const user = await getCurrentUser();
    dispatch({
      type: "LOGIN",
      payload: { isAuthenticated: true, user },
    });
  };

  const register = async (email, password, name) => {
    const response = await http.post("/account/register", {
      email,
      password,
      name,
    });
    const { token } = response.data;
    setSession(token);
    const user = await getCurrentUser();

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const getCurrentUser = async () => {
    var response = await http.get("/account/me");
    return response.data?.currentUser;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
