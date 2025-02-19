import { START_QUOTE_SESSION_ID } from "@/constants";
import { API } from "@/libs/api";
import apiEndpoints from "@/libs/api-endpoints";
import { PetDetailsPayload } from "@/types";
import { getErrorMessage, maxAgeByMinutes } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useInitiateInsurance(onSuccess?: () => void) {
  const router = useRouter();

  return useMutation({
    mutationFn: async function (payload: PetDetailsPayload) {
      const response = await API.post(apiEndpoints.insuranceController.initiateInsurance, payload, {
        headers: {
          Authorization: "",
        },
      });

      return response.data;
    },
    mutationKey: ["initiate_insurance_mutation"],
    onSuccess: (data) => {
      onSuccess?.();
      toast.success(data.message);
      setCookie(START_QUOTE_SESSION_ID, data.data, maxAgeByMinutes(30));
      router.push("/start-a-quote/owner-details");
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });
}
