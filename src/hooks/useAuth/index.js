import { useDispatch, useSelector } from "react-redux";
import { 
  logIn, 
  logOut, 
  resetError, 
  signUp, 
  recoverPassword, 
  authLogInAsGuest, 
  hideOnboarding,
  updateProfile
} from "@/redux/ducks/auth";
import {
  useQueryClient
} from "react-query";
import { subMinutes } from "@/utils";
import { useEffect } from "react";

let inMemoryToken;

export const useAuth = () => {
  
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const state = useSelector(({ auth }) => auth);

  useEffect( () => {
    if(state.token){
      inMemoryToken = {
        value: state.token,
        expiresIn: state.expiresIn,
        expiresInDate: new Date( state.expiresIn * 1000 )
      }
    }
  } , [state] );

  useEffect(() => {
		if (!inMemoryToken) {
      //should refresh token
		}
		const revalidateInterval = setInterval( () => {
			if (inMemoryToken) {
				if (
					subMinutes( inMemoryToken.expiresInDate , 1) <=
					new Date()
				) {
					//should refresh token
          dispatch(logOut())
				}
			} else {
				//should refresh
			}
		}, 60000);

		return () => clearInterval(revalidateInterval);
	}, []);

  return {
    ...state,
    logIn: (userData) => {
      queryClient.invalidateQueries('profile');
      queryClient.invalidateQueries('user-addresses');
      dispatch(logIn(userData));
    },
    logOut: (userData) => {
      dispatch(logOut(userData))
    },
    resetError: () => dispatch(resetError()),
    recoverPassword: (userData) => dispatch(recoverPassword(userData)),
    signUp: (userData) => dispatch(signUp(userData)),
    logInAsGuest: (userData) => dispatch(authLogInAsGuest(userData)),
    hideOnboarding: () => dispatch(hideOnboarding()),
    updateProfile: (profile) => dispatch(updateProfile(profile))
  };
};
