import {
    useQueryClient,
    useMutation,
    useQuery
} from "react-query";
import api from "@/api/v2";
import { useSelector , useDispatch } from "react-redux";
import { addAddress } from "@/redux/ducks/addresses";

export const useUserAddresses = () => {

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const state = useSelector( ({addresses}) => addresses );
  
    const {
      data : addresses
    } = useQuery(
      "user-addresses",
      () => api.users.getAddresses(),
      {
        initialData: state.addresses,
        keepPreviousData: true
      }
    );
  
    const {
      mutate: mutateUserAddress,
      mutateAsync : mutateUserAddressAsync
    } = useMutation(
      ({address_id,...addressData}) => api.users.mutateUserAddress(address_id,addressData),
      {
        onSuccess: (data) => {
            dispatch( addAddress(data) );
            queryClient.setQueryData("user-addresses", oldAddresses => {
                return (oldAddresses || []).map( address => {
                    if(address.id === data.id){
                        return data;
                    }
                    return address;
                });
            })
        }
      }
    );

    return {
      addresses,
      mutateUserAddress,
      mutateUserAddressAsync
    }
}