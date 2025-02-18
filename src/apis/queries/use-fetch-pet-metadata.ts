import { API } from "@/libs/api";
import apiEndpoints from "@/libs/api-endpoints";
import { PetMetaData } from "@/types";
import { getErrorMessage } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useFetchPetMetadata(petType: string) {
  return useQuery<PetMetaData, Error>({
    queryKey: petType ? ["get_pet_metadata_query", petType] : ["get_pet_metadata_query"],
    queryFn: async function () {
      if (!petType) return {};

      try {
        const response = await API.get(apiEndpoints.common.getPetMetadata(petType));
        const { status, data } = response || {};
        if (status === 200) return data.data;
      } catch (err: any) {
        toast.error(getErrorMessage(err));
      }
    },
    enabled: !!petType,
  });
}
