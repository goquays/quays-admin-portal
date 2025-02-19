/* eslint-disable react/no-unescaped-entities */
"use client";
import HeadingText from "@/components/typography/heading";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { cn } from "@/utils/cn";
import { formatEnum } from "@/utils/helpers";
import React from "react";
import { titleCase } from "title-case";
import { format as formatDate } from "date-fns";
import Button from "@/components/button/button";
import AddIcon from "../../../../public/assets/icons/add-icon.svg";
import BackButton from "@/components/back-button/back-button";
import { setIsEditing, updateIndexToEdit, updatePetDetails } from "@/store/features/pet-details-slice";
import { useRouter } from "next/navigation";
import useInitiateInsurance from "@/apis/mutations/use-initiate-insurance";

export default function PetList() {
  const { petDetailsPayload } = useAppSelector((state) => state["pet-details"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const initiateInsurance = useInitiateInsurance();

  const formRow = "flex flex-wrap sm:flex-row flex-col gap-5 sm:items-center w-full justify-between";
  const formRowInfo = "mt-[10px] lg:min-w-[402px] sm:w-[40%] lg:text-lg text-sm text-secondary";

  function editPet(index: number) {
    dispatch(updateIndexToEdit(index));
    dispatch(setIsEditing(true));
    router.push("/start-a-quote/pet-details");
  }

  function removePet(index: number) {
    const updatedPetDetails = petDetailsPayload.petDetailList.filter((_, i) => i !== index);
    dispatch(updatePetDetails({ petDetailList: updatedPetDetails }));
  }

  return (
    <div className="w-full pb-[130px] lg:pb-[195px]">
      <div className="flex lg:gap-6 gap-4 items-baseline">
        <BackButton />
        <h1 className="max-w-[900px] mx-auto lg:text-center font-bold xl:text-[60px] lg:text-[40px] text-[32px]">
          Paw-some Protection for Your Furry BFF
        </h1>
      </div>

      <div className="mt-8 w-full max-w-[967px] mx-auto">
        <p className="text-lg font-semibold">
          For your cover to be valid, please make sure that the below statements are correct:
        </p>
        <ul className="flex flex-col gap-4 mt-6">
          <li className="font-medium text-lg">
            <span className="w-3 h-3 rounded-[50%] flex-shrink-0 bg-[#1E1E1E] inline-block mr-[5px]"></span> You are the
            owner of your pet
          </li>
          <li className="font-medium text-lg">
            <span className="w-3 h-3 rounded-[50%] flex-shrink-0 bg-[#1E1E1E] inline-block mr-[5px]"></span> You live
            with them at the same address
          </li>
          <li className="font-medium text-lg">
            <span className="w-3 h-3 rounded-[50%] flex-shrink-0 bg-[#1E1E1E] inline-block mr-[5px]"></span> You are a
            full-time UK resident
          </li>
        </ul>
        <p className="mt-6 text-lg font-semibold">
          We'll send your pet's details to insurers to find the best plan for you both.
        </p>

        <div className="mt-[62px] w-full">
          <div className={cn("mt-10 !items-start", formRow)}>
            <div className="lg:min-w-[420px] sm:w-[40%] sm:max-w-[450px]">
              <HeadingText intent="lg">Would you like to add another pet?</HeadingText>

              <p className={cn(formRowInfo, "!w-full")}>
                Enjoy a multi-pet discount and get a paw-some deal when you insure all your pets together!
              </p>
            </div>

            <div className="flex-1 lg:max-w-[490px] flex flex-col gap-6 w-full">
              {petDetailsPayload.petDetailList.map((pet, index) => (
                <div
                  key={index}
                  className="bg-background border-[2px] border-primary rounded-lg lg:p-6 px-4 py-6 flex-1"
                >
                  <span className="bg-[rgba(19,19,33,0.1)] flex items-center justify-center p-[10px] w-fit h-11 min-w-[105px] lg:text-lg text-base font-semibold">
                    {pet.petData.name}
                  </span>
                  <p className="mt-4 lg:text-xl text-lg font-semibold">{titleCase(formatEnum(pet.petData.type))}</p>
                  <p className="mt-4 lg:text-lg text-base">
                    {formatDate(new Date(pet.petData.dateOfBirth), "do MMMM yyyy")}
                  </p>
                  <div className="w-full mt-8 flex justify-between gap-3">
                    <Button
                      intent="textUnderline"
                      onClick={() => editPet(index)}
                      disabled={initiateInsurance.isPending}
                    >
                      Edit
                    </Button>

                    <Button
                      intent="textUnderline"
                      onClick={() => removePet(index)}
                      disabled={initiateInsurance.isPending}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                intent="outline"
                className="border-[2px] rounded-lg w-full font-semibold"
                disabled={initiateInsurance.isPending}
                onClick={() => {
                  dispatch(setIsEditing(false));
                  router.push("/start-a-quote/pet-details");
                }}
              >
                <AddIcon className="flex-shrink-0 w-6 h-6" /> Add another pet
              </Button>
            </div>
          </div>

          <Button
            disabled={petDetailsPayload.petDetailList.length === 0}
            loading={initiateInsurance.isPending}
            className="w-full mt-[81px] sm:max-w-[80%] mx-auto"
            onClick={() => initiateInsurance.mutate(petDetailsPayload)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
