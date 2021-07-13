import { useState } from "react";
import api from "@/api/v2";
import { useEffect } from "react";
import { useAuth , useUserAddresses } from "@/hooks";
import { DEFAULT_API_URL, URLS } from "@/constants";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { notify, getMessageFromError, objectToFormData, withApiURL } from "@/utils";
import { COPY } from "@/copy";
import axios from "axios";

const INIT_PROFILE = {
  img_profile: "",
  image: "",
  name: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  latitude: "",
  longitude: "",
};

const requiredKeys = {
  name: "",
  last_name: "",
  phone: "",
  email: ""
}

const ProfileActions = ({navigation}) => {

  const {
    error, 
    loading, 
    user, 
    profile, 
    updateProfile, 
    token 
  } = useAuth();

  const {
    addresses,
    mutateUserAddressAsync
  } = useUserAddresses();
  const [address, setAddress] = useState({});
  const onChangeA = (address) =>{
      setAddress(address)
  }
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    ...INIT_PROFILE,
    ...user.profile,
  });

  const handleChangeForm = (name, newValue) =>
    setFormValues({
      ...formValues,
      [name]: newValue,
    });

  const { 
    data: serverProfile 
  } = useQuery(
    "profile",
    () => api.users.getProfile(),
    {
      initialData: {},
    }
  );

  useEffect(() => {

    if(profile){
      setFormValues( prev => ({...prev,...profile}) )
    }

  }, [profile]);

  const {
    mutate: mutateProfile,
    isLoading: isMutating,
    error: errorMutating,
  } = useMutation(
    async (profileData) => {
      let {
        name,
        last_name,
        phone,
        address,
        image,
        email,
        id
      } = profileData;

      let data = objectToFormData({
          name,
          last_name,
          phone,
          address,
          email
      });

      if(typeof image === "object"){
        data.append("image",image)
      }

      const res = await axios({
        method: id ? "PUT" : "POST",
        url: withApiURL("profile"),
        headers: {
          "content-type": "multipart/form-data",
          "x-access-token": token
        },
        data: data
      })
      
      return {data: res.data, hasID: !!id };

    },
    {
      onError: (err) => {
        console.log(err);
        notify.error({
          title: `${getMessageFromError(err)}`,
        });

        throw err;
      },
      onSuccess: async ({data, hasID}) => {
        queryClient.setQueryData("profile", data);
        updateProfile(data);

        if (address.address && address.city) {
          await mutateUserAddressAsync({
            address_id: addresses?.[0]?.id,
            latitude: address.latitude,
            longitude: address.longitude,
            address: address.address,
            city: address.city,
            description: address.description,
          });
        }

        notify.success({
          title: hasID ?  COPY["profile.mutate.success"] : COPY["profile.create.success"] ,
        });
        if(!hasID){
          navigation.navigate(URLS.home) 
        }

      },
    }
  );

  const onEnterPress = () => {
    mutateProfile(formValues);
  };

  const profileRaw =  {
    ...profile,
    ...addresses?.[0],
    ...formValues
  };

  const hasError = Object.keys(requiredKeys).some( key => !profileRaw[key] )

  return {
    profile: profileRaw,
    hasError: profileRaw.id ? hasError : hasError || !(address.address && address.city),
    handleChangeForm,
    addresses,
    loading,
    isMutating,
    errorMutating,
    error,
    onEnterPress,
    onChangeA,
    address,
  };
};

export default ProfileActions;
