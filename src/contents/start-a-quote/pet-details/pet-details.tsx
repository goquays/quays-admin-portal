/* eslint-disable react/no-unescaped-entities */
"use client";
import BackButton from "@/components/back-button/back-button";
import React from "react";
import PetDetailsForm from "./pet-details-form";

export default function PetDetails() {
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

        <PetDetailsForm />
      </div>
    </div>
  );
}
