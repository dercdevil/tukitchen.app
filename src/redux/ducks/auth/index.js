import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '@/api/v2';

import {ENDPOINTS, ROLES} from '@/constants';

import {getMessageFromError,notify} from '@/utils';

const AUTH_LOG_IN_REQUEST = "AUTH_LOG_IN_REQUEST";
const AUTH_LOG_IN_FAILURE = "AUTH_LOG_IN_FAILURE";
const AUTH_LOG_IN_SUCCESS = "AUTH_LOG_IN_SUCCESS";
const AUTH_LOG_IN_AS_GUEST = "AUTH_LOG_IN_AS_GUEST";

export const AUTH_LOG_OUT = "AUTH_LOG_OUT";

const AUTH_RESET_ERROR = "AUTH_RESET_ERROR";

const AUTH_SIGN_UP_REQUEST = "AUTH_SIGN_UP_REQUEST";
const AUTH_SIGN_UP_FAILURE = "AUTH_SIGN_UP_FAILURE";
const AUTH_SIGN_UP_SUCCESS = "AUTH_SIGN_UP_SUCCESS";

const AUTH_RECOVER_PASSWORD_REQUEST = "AUTH_RECOVER_PASSWORD_REQUEST";
const AUTH_RECOVER_PASSWORD_FAILURE = "AUTH_RECOVER_PASSWORD_FAILURE";
const AUTH_RECOVER_PASSWORD_SUCCESS = "AUTH_RECOVER_PASSWORD_SUCCESS";

const HIDE_ONBOARDING = "HIDE_ONBOARDING";
const UPDATE_PROFILE = "UPDATE_PROFILE";

export const updateProfile = (profile) => ({
  type: UPDATE_PROFILE,
  payload: {
    profile
  }
})

export const hideOnboarding = () => ({
  type: HIDE_ONBOARDING
});

const authLogInRequest = () => ({
  type: AUTH_LOG_IN_REQUEST,
});
const authLogInFailure = (error) => ({
  type: AUTH_LOG_IN_FAILURE,
  payload: error,
});
const authLogInSuccess = (user) => ({
  type: AUTH_LOG_IN_SUCCESS,
  payload: user,
});
export const authLogInAsGuest = (user) => ({
  type: AUTH_LOG_IN_AS_GUEST,
  payload: user
});

export const logIn = ({ rut, password }) => async (dispatch, getState) => {
  try {
    dispatch(authLogInRequest());

    const { token , user, expIn } = await api.auth.logIn({rut,password});

    dispatch(authLogInSuccess({ 
      token, 
      user: {
        ...user,
      },
      expiresIn: expIn,
      name: "Test" 
    }));

    const { auth } = getState();
    await AsyncStorage.setItem("user", JSON.stringify(auth));

  } catch (err) {
    
    const message = getMessageFromError(err);

    dispatch(
      authLogInFailure( message )
    );
  }

};

const authLogOutSuccess = () => ({
  type: AUTH_LOG_OUT,
});

export const logOut = () => async (dispatch) => {
  api.setAccessTokenHeader(null);
  await AsyncStorage.setItem("user", JSON.stringify({}) );
  dispatch(authLogOutSuccess());
};

export const resetError = () => ({
  type: AUTH_RESET_ERROR,
});

const authSignUpRequest = () => ({
  type: AUTH_SIGN_UP_REQUEST,
});
const authSignUpFailure = (error) => ({
  type: AUTH_SIGN_UP_FAILURE,
  payload: error,
});
const authSignUpSuccess = () => ({
  type: AUTH_SIGN_UP_SUCCESS,
});

export const signUp = ({ 
  role = ROLES.buyer , 
  passwordRepeat : password_repeat , 
  password,
  rut
}) => async (dispatch) => {
    try {

      dispatch(authSignUpRequest());

      await api.auth.signUp({
        role,
        password_repeat,
        password,
        rut
      });

      dispatch(authSignUpSuccess());

    } catch (err) {

      const message = getMessageFromError(err);

      dispatch(authSignUpFailure(message));

    }
};

const authRecoverPasswordRequest = () => ({
  type: AUTH_RECOVER_PASSWORD_REQUEST,
});
const authRecoverPasswordFailure = (error) => ({
  type: AUTH_RECOVER_PASSWORD_FAILURE,
  payload: error,
});
const authRecoverPasswordSuccess = () => ({
  type: AUTH_RECOVER_PASSWORD_SUCCESS,
});

export const recoverPassword = ({email}) => async dispatch => {

  try{

    dispatch(authRecoverPasswordRequest());

    await api.post(
      ENDPOINTS.recoverPassword,
      {email}
    );

    dispatch(authRecoverPasswordSuccess());

  }catch(e){
    
    const message = getMessageFromError(e);

    dispatch(authRecoverPasswordFailure( message ));

  }

} 

const initialState = {
  error: "",
  loading: false,
  isLoggedIn: false,
  isLoggedInAsGuest: false,
  shouldShowOnboarding: true,
  hasProfile: false,
  user: {},
  profile: null,
  expiresIn: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case HIDE_ONBOARDING:
      return {
        ...state,
        shouldShowOnboarding: false
      }

    case AUTH_RECOVER_PASSWORD_REQUEST:
    case AUTH_LOG_IN_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };

    case AUTH_RECOVER_PASSWORD_FAILURE:
    case AUTH_LOG_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AUTH_LOG_IN_AS_GUEST:
      return {
        ...state,
        user: {},
        isLoggedInAsGuest: true
      }

    case AUTH_LOG_IN_SUCCESS:
      return {
        error: "",
        loading: false,
        isLoggedIn: true,
        user: action.payload.user,
        profile: action.payload.profile,
        token: action.payload.token,
        expiresIn: action.payload.expiresIn
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload.profile
        },
        profile: action.payload.profile
      }

    case AUTH_LOG_OUT:
      return {
        error: "",
        loading: false,
        isLoggedIn: false,
        isLoggedInAsGuest: false,
        user: {},
        profile: null,
        expiresIn: null
      };

    case AUTH_RESET_ERROR:
      return {
        ...state,
        error: "",
        loading: false,
      };

    case AUTH_SIGN_UP_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case AUTH_SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AUTH_RECOVER_PASSWORD_SUCCESS:
    case AUTH_SIGN_UP_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      };

    default:
      return state;
  }
};
