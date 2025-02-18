/* eslint-disable react/no-unescaped-entities */
import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { PetTypes } from "@/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import HeadingText from "@/components/typography/heading";
import { cn } from "@/utils/cn";
import CustomSelect from "@/components/custom-select/custom-select";
import { titleCase } from "title-case";
import { formatEnum } from "@/utils/helpers";
import CustomInput from "@/components/custom-input/custom-input";
import OptionsPill from "@/components/options-pill/options-pill";
import useFetchPetMetadata from "@/apis/queries/use-fetch-pet-metadata";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner";
import CustomDatePicker from "@/components/custom-datepicker/custom-datepicker";
import HelpTooltip from "@/components/help-tooltip/help-tooltip";
import CustomCurrencyInput from "@/components/custom-currency-input/custom-currency-input";

const formValidationSchema = yup.object().shape({
  type: yup.mixed().required("Type of pet is required"),
  name: yup.string().trim().required("Name of pet is required"),
  gender: yup.string().trim().required("Gender of pet is required"),
  dateOfBirth: yup.string().trim().required("Date of birth of pet is required"),
  breed: yup.string().trim().required("Breed of pet is required"),
  amountDonated: yup.number().typeError("Enter digit only").min(1, "Please enter a value"),
  coverExtraActivities: yup
    .bool()
    .when("type", ([type], schema) =>
      type === PetTypes.HORSE ? schema.required("Select an option") : schema.notRequired(),
    ),
  color: yup
    .string()
    .trim()
    .when("type", ([type], schema) =>
      type === PetTypes.HORSE ? schema.required("Color is required") : schema.notRequired(),
    ),
  ownershipType: yup
    .string()
    .trim()
    .when("type", ([type], schema) =>
      type === PetTypes.HORSE ? schema.required("Ownership type is required") : schema.notRequired(),
    ),
  hHeight: yup
    .number()
    .when("type", ([type], schema) =>
      type === PetTypes.HORSE ? schema.required("Enter length of hand") : schema.notRequired(),
    )
    .typeError("Enter digit only")
    .min(1, "Please enter a value"),
  iHeight: yup
    .number()
    .when("type", ([type], schema) =>
      type === PetTypes.HORSE ? schema.required("Enter inches of pet") : schema.notRequired(),
    )
    .typeError("Enter digit only")
    .min(1, "Please enter a value"),
  coverPreexistingCondition: yup.bool().required("Select an option"),
  hasBeenNeutered: yup
    .bool()
    .when("coverPreexistingCondition", ([coverPreexistingCondition], schema) =>
      !coverPreexistingCondition ? schema.required("Select an option") : schema.notRequired(),
    ),
  hasBeenChipped: yup
    .bool()
    .when("coverPreexistingCondition", ([coverPreexistingCondition], schema) =>
      !coverPreexistingCondition ? schema.required("Select an option") : schema.notRequired(),
    ),
  hasShownSignsOfAggression: yup
    .bool()
    .when("coverPreexistingCondition", ([coverPreexistingCondition], schema) =>
      !coverPreexistingCondition ? schema.required("Select an option") : schema.notRequired(),
    ),
  vaccineUpToDate: yup
    .bool()
    .when("coverPreexistingCondition", ([coverPreexistingCondition], schema) =>
      !coverPreexistingCondition ? schema.required("Select an option") : schema.notRequired(),
    ),
  hasBeenSubjectOfLegalComplaint: yup
    .bool()
    .when("coverPreexistingCondition", ([coverPreexistingCondition], schema) =>
      !coverPreexistingCondition ? schema.required("Select an option") : schema.notRequired(),
    ),
});

export default function PetDetailsForm() {
  const { petDetailsPayload, indexOfPetToEdit } = useAppSelector((state) => state["pet-details"]);
  const petDetailList = React.useMemo(() => petDetailsPayload?.petDetailList || [], [petDetailsPayload]);
  const dispatch = useAppDispatch();
  const [petTypeSelected, setPetTypeSelected] = React.useState("");
  const getPetMetadata = useFetchPetMetadata(petTypeSelected);

  const formRow = "flex flex-wrap sm:flex-row flex-col gap-5 sm:items-center w-full justify-between";
  const formRowLabel = "lg:text-2xl text-lg font-medium lg:min-w-[420px] sm:w-[40%]";
  const formRowInfo = "mt-[10px] lg:min-w-[402px] sm:w-[40%] lg:text-lg text-sm text-secondary";

  const initialFormValues = {
    type: petDetailList[indexOfPetToEdit]?.petData.type || "",
    name: petDetailList[indexOfPetToEdit]?.petData.name || "",
    gender: petDetailList[indexOfPetToEdit]?.petData.gender || "",
    dateOfBirth: petDetailList[indexOfPetToEdit]?.petData.dateOfBirth || "",
    breed: petDetailList[indexOfPetToEdit]?.petData.breed || "",
    amountDonated: petDetailList[indexOfPetToEdit]?.petData.amountDonated || "",
    coverExtraActivities: petDetailList[indexOfPetToEdit]?.petData.coverExtraActivities || false,
    color: petDetailList[indexOfPetToEdit]?.petData.color || "",
    ownershipType: petDetailList[indexOfPetToEdit]?.petData.ownershipType || "",
    hHeight: petDetailList[indexOfPetToEdit]?.petData.hHeight || "",
    iHeight: petDetailList[indexOfPetToEdit]?.petData.iHeight || "",
    coverPreexistingCondition: petDetailList[indexOfPetToEdit]?.healthData.coverPreexistingCondition || false,
    hasBeenNeutered: petDetailList[indexOfPetToEdit]?.healthData.hasBeenNeutered || false,
    hasBeenChipped: petDetailList[indexOfPetToEdit]?.healthData.hasBeenChipped || false,
    hasShownSignsOfAggression: petDetailList[indexOfPetToEdit]?.healthData.hasShownSignsOfAggression || false,
    vaccineUpToDate: petDetailList[indexOfPetToEdit]?.healthData.vaccineUpToDate || false,
    hasBeenSubjectOfLegalComplaint: petDetailList[indexOfPetToEdit]?.healthData.hasBeenSubjectOfLegalComplaint || false,
  };

  React.useEffect(() => {
    if (petDetailList[indexOfPetToEdit]?.petData.type) setPetTypeSelected(petDetailList[indexOfPetToEdit].petData.type);
  }, [indexOfPetToEdit, petDetailList]);

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, handleSubmit, setFieldValue, handleChange }) => {
        return (
          <form
            className="w-full flex flex-col gap-[13px] mt-[62px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <HeadingText intent="lg">About your pet</HeadingText>

            <div className={formRow}>
              <label className={formRowLabel}>What type of pet do you have?</label>
              <CustomSelect
                name="type"
                className="flex-1 max-w-[490px]"
                placeholder="e.g Dog, Cat, etc"
                value={values.type}
                // isLoading={getCategories.isPending}
                onChange={(value) => {
                  // @ts-ignore
                  setFieldValue("type", value ? value : null);
                  // @ts-ignore
                  setPetTypeSelected(value ? value.value : "");
                }}
                options={Object.values(PetTypes).map((type) => ({ label: titleCase(formatEnum(type)), value: type }))}
                error={touched.type && errors.type}
              />
            </div>

            <div className={cn("mt-10", formRow)}>
              <label className={formRowLabel}>What is their name?</label>
              <CustomInput
                className="flex-1 max-w-[490px]"
                name="name"
                placeholder="e.g Bingo, Jack, Ceaser"
                value={values.name}
                onChange={handleChange}
                error={touched.name && errors.name}
              />
            </div>

            {values.type && (
              <div className={cn("mt-10 !items-start", formRow)}>
                <label className={formRowLabel}>Is your pet male or female?</label>
                <div className="flex-1 max-w-[490px] w-full">
                  <div className="w-full flex flex-wrap gap-6">
                    {getPetMetadata.isSuccess ? (
                      getPetMetadata.data?.genders.map((gender, i) => (
                        <OptionsPill
                          key={i}
                          label={titleCase(formatEnum(gender))}
                          value={gender}
                          selectedValue={values.gender}
                          onSelect={(val) => setFieldValue("gender", val)}
                        />
                      ))
                    ) : (
                      <LoadingSpinner />
                    )}
                  </div>
                  {touched.gender && errors.gender && (
                    <span className="text-red text-sm mt-1 block w-fit">{errors.gender}</span>
                  )}
                </div>
              </div>
            )}

            <div className={cn("mt-10 !items-start", formRow)}>
              <div className="lg:min-w-[420px] sm:w-[40%]">
                <label className={cn(formRowLabel, "!w-full")}>What is your pet’s date of birth?</label>
                <p className={cn(formRowInfo, "!w-full")}>
                  If your pet is over 5 weeks old and you don't know the exact day, you can enter 01.
                </p>
                <HelpTooltip
                  className="mt-3"
                  toolTipId="DOB-tooltip"
                  toolTipContent="Just like humans, insurance costs for pets can vary due to their age. We need to know how old your pet is so that we can show you the most accurate quotes that we can. Your pet needs to be at least 5 weeks old to be covered, although some insurers' policies start from 8 weeks and over."
                />
              </div>
              <CustomDatePicker
                className="flex-1 max-w-[490px]"
                value={values.dateOfBirth}
                onChangeDay={(val) => {
                  const updatedDate = values.dateOfBirth?.split("-");
                  updatedDate[2] = val;
                  setFieldValue("dateOfBirth", updatedDate.join("-"));
                }}
                onChangeMonth={(val) => {
                  const updatedDate = values.dateOfBirth?.split("-");
                  updatedDate[1] = val;
                  setFieldValue("dateOfBirth", updatedDate.join("-"));
                }}
                onChangeYear={(val) => {
                  const updatedDate = values.dateOfBirth?.split("-");
                  updatedDate[0] = val;
                  setFieldValue("dateOfBirth", updatedDate.join("-"));
                }}
                error={touched.dateOfBirth && errors.dateOfBirth}
              />
            </div>

            {values.type && values.name && (
              <div className={cn("mt-10 !items-start", formRow)}>
                <div className="lg:min-w-[420px] sm:w-[40%]">
                  <label className={cn(formRowLabel, "!w-full")}>What breed is {titleCase(values.name)}?</label>
                  <HelpTooltip
                    className="mt-3"
                    toolTipId="breed-tooltip"
                    toolTipContent="Select 'pedigree' if your dog's parents are both the same breed, or 'crossbreed' if they have parents from two different breeds. If you're not sure what breed they are (or if they're a mix of several different breeds), select 'mongrel'."
                  />
                </div>
                <div className="flex-1 max-w-[490px] w-full">
                  <div className="w-full flex flex-wrap gap-6">
                    {getPetMetadata.isSuccess ? (
                      getPetMetadata.data?.types.map((t, i) => (
                        <OptionsPill
                          key={i}
                          label={titleCase(formatEnum(t))}
                          value={t}
                          selectedValue={values.breed}
                          onSelect={(val) => setFieldValue("breed", val)}
                        />
                      ))
                    ) : (
                      <LoadingSpinner />
                    )}
                  </div>
                  {touched.breed && errors.breed && (
                    <span className="text-red text-sm mt-1 block w-fit">{errors.breed}</span>
                  )}
                </div>
              </div>
            )}

            {values.name && (
              <div className={cn("mt-10 !items-start", formRow)}>
                <div className="lg:min-w-[420px] sm:w-[40%]">
                  <label className={cn(formRowLabel, "!w-full")}>
                    How much did you pay or donate for {titleCase(values.name)}?
                  </label>
                  <HelpTooltip
                    className="mt-3"
                    toolTipId="donation-tooltip"
                    toolTipContent="Please tell us how much you paid (or donated) for your pet to the nearest pound, or enter zero if you didn't pay for your pet. Inaccurate information might limit how much is paid out in the event that your pet is lost or stolen. Some insurers require proof of how much you paid or they will only pay out a minimal sum in the event of a claim."
                  />
                </div>
                <CustomCurrencyInput
                  name="amountDonated"
                  placeholder="0-999999"
                  value={values.amountDonated}
                  onChange={(value) => {
                    const amount = value ?? "";
                    setFieldValue("amountDonated", amount);
                  }}
                  error={touched.amountDonated && errors.amountDonated}
                  className="flex-1 max-w-[490px]"
                />
              </div>
            )}
          </form>
        );
      }}
    </Formik>
  );
}
