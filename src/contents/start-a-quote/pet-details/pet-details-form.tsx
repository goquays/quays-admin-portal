/* eslint-disable react/no-unescaped-entities */
import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { OwnershipTypeEnums, PetColorEnums, PetTypes, YesOrNoEnums } from "@/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import HeadingText from "@/components/typography/heading";
import { cn } from "@/utils/cn";
import CustomSelect from "@/components/custom-select/custom-select";
import { titleCase } from "title-case";
import { formatEnum, handleUpdatePetDetails } from "@/utils/helpers";
import CustomInput from "@/components/custom-input/custom-input";
import OptionsPill from "@/components/options-pill/options-pill";
import useFetchPetMetadata from "@/apis/queries/use-fetch-pet-metadata";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner";
import CustomDatePicker from "@/components/custom-datepicker/custom-datepicker";
import HelpTooltip from "@/components/help-tooltip/help-tooltip";
import CustomCurrencyInput from "@/components/custom-currency-input/custom-currency-input";
import TipBanner from "@/components/tip-banner/tip-banner";
import Button from "@/components/button/button";
import ActivitiesCovered from "./activities-covered";
import ErrorExclamationIcon from "../../../../public/assets/icons/error-exclamation.svg";
import { PetDetailList } from "@/types";
import { setIsEditing, updateIndexToEdit, updatePetDetails } from "@/store/features/pet-details-slice";
import { useRouter } from "next/navigation";
import { format as formatDate } from "date-fns";

const formValidationSchema = yup.object().shape({
  type: yup.string().trim().required("Select type of pet"),
  name: yup.string().trim().required("Name of pet is required"),
  gender: yup.string().trim().required("Gender of pet is required"),
  // dateOfBirth: yup.string().trim().required("Date of birth of pet is required"),
  dateOfBirthDay: yup.number().typeError("Enter digit only").min(1, "Please enter a value").required("Day is required"),
  dateOfBirthMonth: yup
    .number()
    .typeError("Enter digit only")
    .min(1, "Please enter a value")
    .required("Month is required"),
  dateOfBirthYear: yup
    .number()
    .typeError("Enter digit only")
    .min(1, "Please enter a value")
    .required("Year is required"),
  breed: yup.string().trim().required("Breed of pet is required"),
  amountDonated: yup
    .number()
    .typeError("Enter digit only")
    .min(1, "Please enter a value")
    .required("Please enter a value"),
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
      type === PetTypes.HORSE ? schema.required("Enter length of hands") : schema.notRequired(),
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
  const { petDetailsPayload, indexOfPetToEdit, isEditing } = useAppSelector((state) => state["pet-details"]);
  const petDetailList = React.useMemo(() => petDetailsPayload.petDetailList, [petDetailsPayload]);
  const [petTypeSelected, setPetTypeSelected] = React.useState("");
  const getPetMetadata = useFetchPetMetadata(petTypeSelected);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formRow = "flex flex-wrap sm:flex-row flex-col gap-5 sm:items-center w-full justify-between";
  const formRowLabel = "lg:text-2xl text-lg font-medium lg:min-w-[420px] sm:w-[40%]";
  const formRowInfo = "mt-[10px] lg:min-w-[402px] sm:w-[40%] lg:text-lg text-sm text-secondary";

  const initialFormValues = {
    type: isEditing ? petDetailList[indexOfPetToEdit]?.petData.type : "",
    name: isEditing ? petDetailList[indexOfPetToEdit]?.petData.name : "",
    gender: isEditing ? petDetailList[indexOfPetToEdit]?.petData.gender : "",
    // dateOfBirth: petDetailList[indexOfPetToEdit]?.petData.dateOfBirth || "",
    dateOfBirthDay: isEditing ? petDetailList[indexOfPetToEdit]?.petData.dateOfBirth.split("-")[2] : "",
    dateOfBirthMonth: isEditing ? petDetailList[indexOfPetToEdit]?.petData.dateOfBirth.split("-")[1] : "",
    dateOfBirthYear: isEditing ? petDetailList[indexOfPetToEdit]?.petData.dateOfBirth.split("-")[0] : "",
    breed: isEditing ? petDetailList[indexOfPetToEdit]?.petData.breed : "",
    amountDonated: isEditing ? petDetailList[indexOfPetToEdit]?.petData.amountDonated : "",
    coverExtraActivities: isEditing ? petDetailList[indexOfPetToEdit]?.petData.coverExtraActivities : false,
    color: isEditing ? petDetailList[indexOfPetToEdit]?.petData.color : "",
    ownershipType: isEditing ? petDetailList[indexOfPetToEdit]?.petData.ownershipType : "",
    hHeight: isEditing ? petDetailList[indexOfPetToEdit]?.petData.hHeight : "",
    iHeight: isEditing ? petDetailList[indexOfPetToEdit]?.petData.iHeight : "",
    coverPreexistingCondition: isEditing
      ? petDetailList[indexOfPetToEdit]?.healthData.coverPreexistingCondition
      : false,
    hasBeenNeutered: isEditing ? petDetailList[indexOfPetToEdit]?.healthData.hasBeenNeutered : false,
    hasBeenChipped: isEditing ? petDetailList[indexOfPetToEdit]?.healthData.hasBeenChipped : false,
    hasShownSignsOfAggression: isEditing
      ? petDetailList[indexOfPetToEdit]?.healthData.hasShownSignsOfAggression
      : false,
    vaccineUpToDate: isEditing ? petDetailList[indexOfPetToEdit]?.healthData.vaccineUpToDate : false,
    hasBeenSubjectOfLegalComplaint: isEditing
      ? petDetailList[indexOfPetToEdit]?.healthData.hasBeenSubjectOfLegalComplaint
      : false,
  };

  React.useEffect(() => {
    if (petDetailList[indexOfPetToEdit]?.petData.type) setPetTypeSelected(petDetailList[indexOfPetToEdit].petData.type);
  }, [indexOfPetToEdit, petDetailList]);

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={(values) => {
        const payload: PetDetailList = {
          petData: {
            type: values.type,
            name: titleCase(values.name),
            gender: values.gender,
            dateOfBirth: formatDate(
              new Date(`${values.dateOfBirthYear}-${values.dateOfBirthMonth}-${values.dateOfBirthDay}`),
              "yyyy-MM-dd",
            ),
            breed: values.breed,
            amountDonated: Number(values.amountDonated),
            coverExtraActivities: values.coverExtraActivities ? values.coverExtraActivities : undefined,
            color: values.color ? values.color : undefined,
            ownershipType: values.ownershipType ? values.ownershipType : undefined,
            hHeight: values.hHeight ? Number(values.hHeight) : undefined,
            iHeight: values.iHeight ? Number(values.iHeight) : undefined,
          },
          healthData: {
            coverPreexistingCondition: values.coverPreexistingCondition,
            hasBeenNeutered: !values.coverPreexistingCondition ? values.hasBeenNeutered : undefined,
            hasBeenChipped: !values.coverPreexistingCondition ? values.hasBeenChipped : undefined,
            hasShownSignsOfAggression: !values.coverPreexistingCondition ? values.hasShownSignsOfAggression : undefined,
            vaccineUpToDate: !values.coverPreexistingCondition ? values.vaccineUpToDate : undefined,
            hasBeenSubjectOfLegalComplaint: !values.coverPreexistingCondition
              ? values.hasBeenSubjectOfLegalComplaint
              : undefined,
          },
        };

        let computedPayload: PetDetailList[];

        if (isEditing) {
          computedPayload = handleUpdatePetDetails(petDetailsPayload.petDetailList, payload, indexOfPetToEdit);
        } else {
          computedPayload = [payload, ...petDetailsPayload.petDetailList];
          dispatch(updateIndexToEdit(computedPayload.length - 1));
        }

        dispatch(updatePetDetails({ petDetailList: computedPayload }));
        dispatch(setIsEditing(false));
        router.push("/start-a-quote/pet-details/list");
      }}
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
                className="flex-1 lg:max-w-[490px]"
                placeholder="e.g Dog, Cat, etc"
                value={Object.values(PetTypes)
                  .filter((type) => type === values.type)
                  .map((type) => ({ label: titleCase(formatEnum(type)), value: type }))}
                onChange={(value) => {
                  setFieldValue("gender", "", false);
                  setFieldValue("breed", "", false);
                  setFieldValue("coverExtraActivities", false, false);
                  setFieldValue("color", "", false);
                  setFieldValue("ownershipType", "", false);
                  setFieldValue("hHeight", "", false);
                  setFieldValue("iHeight", "", false);
                  // @ts-ignore
                  setFieldValue("type", value ? value.value : null);
                  // @ts-ignore
                  setPetTypeSelected(value ? value.value : "");
                }}
                options={Object.values(PetTypes).map((type) => ({
                  label: titleCase(formatEnum(type)),
                  value: type,
                }))}
                error={touched.type && errors.type}
              />
            </div>

            <div className={cn("mt-10", formRow)}>
              <label className={formRowLabel}>What is their name?</label>
              <CustomInput
                className="flex-1 lg:max-w-[490px]"
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
                <div className="flex-1 lg:max-w-[490px] w-full">
                  <div className="w-full flex flex-wrap gap-6">
                    {getPetMetadata.isSuccess ? (
                      getPetMetadata.data?.genders.map((gender, i) => (
                        <OptionsPill
                          key={i}
                          label={titleCase(formatEnum(gender))}
                          value={gender}
                          selectedValue={values.gender}
                          onSelect={(val) => setFieldValue("gender", val)}
                          className="flex-1 min-w-[233px] max-w-[233px]"
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
                className="flex-1 lg:max-w-[490px]"
                dayValue={values.dateOfBirthDay}
                monthValue={values.dateOfBirthMonth}
                yearValue={values.dateOfBirthYear}
                onChangeDay={(val) => setFieldValue("dateOfBirthDay", val)}
                onChangeMonth={(val) => setFieldValue("dateOfBirthMonth", val)}
                onChangeYear={(val) => {
                  // const updatedDate = values.dateOfBirth?.split("-");
                  // updatedDate[0] = val;
                  setFieldValue("dateOfBirthYear", val);
                }}
                error={
                  (touched.dateOfBirthDay && errors.dateOfBirthDay) ||
                  (touched.dateOfBirthMonth && errors.dateOfBirthMonth) ||
                  (touched.dateOfBirthYear && errors.dateOfBirthYear)
                }
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
                <div className="flex-1 lg:max-w-[490px] w-full">
                  <div className="w-full flex flex-wrap gap-6">
                    {getPetMetadata.isSuccess ? (
                      getPetMetadata.data?.types.map((t, i) => (
                        <OptionsPill
                          key={i}
                          label={titleCase(formatEnum(t))}
                          value={t}
                          selectedValue={values.breed}
                          onSelect={(val) => setFieldValue("breed", val)}
                          className="flex-1 min-w-[233px] max-w-[233px]"
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

            {values.type === PetTypes.HORSE && values.name && (
              <div className="flex flex-col gap-[13px] w-full">
                <div className={cn("mt-10 !items-start", formRow)}>
                  <div className="lg:min-w-[420px] sm:w-[40%]">
                    <label className={cn(formRowLabel, "!w-full")}>What is {values.name}'s height?</label>
                    <p className={cn(formRowInfo, "!w-full")}>
                      If {values.name} is four years of age, please provide the expected adult height
                    </p>
                  </div>

                  <div className="flex-1 lg:max-w-[490px] w-full flex gap-6 flex-wrap">
                    <CustomInput
                      className="flex-1"
                      name="hHeight"
                      label="Hands"
                      placeholder=""
                      value={values.hHeight}
                      onChange={(e) => {
                        const value = e.target.value;
                        const handsValue = value ? value.replace(/[^0-9+]/g, "") : "";
                        setFieldValue("hHeight", handsValue);
                      }}
                      error={touched.hHeight && errors.hHeight}
                    />

                    <CustomInput
                      className="flex-1"
                      name="iHeight"
                      label="Inches"
                      placeholder=""
                      value={values.iHeight}
                      onChange={(e) => {
                        const value = e.target.value;
                        const inchesValue = value ? value.replace(/[^0-9+]/g, "") : "";
                        setFieldValue("iHeight", inchesValue);
                      }}
                      error={touched.iHeight && errors.iHeight}
                    />
                  </div>
                </div>

                <div className={cn("mt-10", formRow)}>
                  <label className={formRowLabel}>What is {values.name}'s color?</label>
                  <CustomSelect
                    name="color"
                    className="flex-1 lg:max-w-[490px]"
                    placeholder="e.g Brown, black, albino, etc"
                    value={Object.values(PetColorEnums)
                      .filter((color) => color === values.color)
                      .map((color) => ({ label: titleCase(formatEnum(color)), value: color }))}
                    onChange={(value) => {
                      // @ts-ignore
                      setFieldValue("color", value ? value.value : null);
                    }}
                    options={Object.values(PetColorEnums).map((color) => ({
                      label: titleCase(formatEnum(color)),
                      value: color,
                    }))}
                    error={touched.color && errors.color}
                  />
                </div>

                <div className={cn("mt-10", formRow)}>
                  <label className={formRowLabel}>Owned or Loaned</label>
                  <div className="flex-1 lg:max-w-[490px] w-full">
                    <div className="w-full flex gap-6 flex-wrap">
                      {Object.values(OwnershipTypeEnums).map((i) => (
                        <OptionsPill
                          key={i}
                          className="flex-1"
                          label={titleCase(formatEnum(i))}
                          value={i}
                          selectedValue={values.ownershipType || ""}
                          onSelect={(val) => setFieldValue("ownershipType", val)}
                        />
                      ))}
                    </div>
                    {touched.ownershipType && errors.ownershipType && (
                      <span className="text-red text-sm mt-1 block w-fit">{errors.ownershipType}</span>
                    )}
                  </div>
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
                  className="flex-1 lg:max-w-[490px]"
                />
              </div>
            )}

            {values.type === PetTypes.HORSE && (
              <>
                <HeadingText intent="lg" className="mt-10">
                  Please review the full list of activities we cover
                </HeadingText>

                <TipBanner className="mt-5 pb-[33px]">
                  <ActivitiesCovered />
                </TipBanner>

                <div className={cn(formRow, "mt-10")}>
                  <label className={formRowLabel}>Do you want to cover for these activities?</label>
                  <div className="flex-1 lg:max-w-[490px] w-full">
                    <div className="w-full flex flex-wrap gap-6">
                      {Object.values(YesOrNoEnums).map((i) => (
                        <OptionsPill
                          key={i}
                          className="flex-1"
                          label={titleCase(formatEnum(i))}
                          value={i}
                          selectedValue={values.coverExtraActivities ? "YES" : "NO"}
                          onSelect={(val) =>
                            setFieldValue("coverExtraActivities", val === YesOrNoEnums.YES ? true : false)
                          }
                        />
                      ))}
                    </div>
                    {touched.coverExtraActivities && errors.coverExtraActivities && (
                      <span className="text-red text-sm mt-1 block w-fit">{errors.coverExtraActivities}</span>
                    )}
                  </div>
                </div>
              </>
            )}

            <HeadingText intent="lg" className="mt-10">
              Tell Us About Your Pet's Health
            </HeadingText>

            <TipBanner
              heading="Here's a helpful tip"
              className="mt-5"
              text="Pet insurance is for unexpected medical events. It usually won't cover conditions your pet already has (pre-existing conditions). If you need coverage for pre-existing conditions, you'll likely need to speak with a specialist provider for options."
            />

            <div className={cn("mt-10 !items-start", formRow)}>
              <div className="lg:min-w-[420px] sm:w-[40%]">
                <label className={cn(formRowLabel, "!w-full flex gap-4 items-start")}>
                  {values.coverPreexistingCondition && <ErrorExclamationIcon className="w-6 h-6 flex-shrink-0" />} Does
                  your policy need to cover your pet for any pre-existing medical conditions?
                </label>
                <HelpTooltip
                  className="mt-3"
                  toolTipId="cover-extra-activities-tooltip"
                  toolTipContent="Does your policy need to cover your pet for any pre-existing medical conditions?"
                />
              </div>

              <div className="flex-1 lg:max-w-[490px] w-full">
                {values.coverPreexistingCondition && (
                  <TipBanner className="bg-transparent py-2 after:bg-[#EF4444] min-h-[140px] mb-[56px]">
                    <p className="lg:text-lg text-base text-black font-medium">
                      Insurance for pre-existing conditions needs to be sorted out by a specialist provider, which we
                      can't offer at the moment. 
                      <a className="underline font-semibold">Please see our specialist provider guide here</a>.
                    </p>
                  </TipBanner>
                )}
                <div className="w-full flex flex-wrap gap-6">
                  {Object.values(YesOrNoEnums).map((i) => (
                    <OptionsPill
                      key={i}
                      className="flex-1"
                      label={titleCase(formatEnum(i))}
                      value={i}
                      selectedValue={values.coverPreexistingCondition ? "YES" : "NO"}
                      onSelect={(val) => {
                        setFieldValue("hasBeenNeutered", false, false);
                        setFieldValue("hasBeenChipped", false, false);
                        setFieldValue("hasShownSignsOfAggression", false, false);
                        setFieldValue("vaccineUpToDate", false, false);
                        setFieldValue("hasBeenSubjectOfLegalComplaint", false, false);
                        setFieldValue("coverPreexistingCondition", val === YesOrNoEnums.YES ? true : false);
                      }}
                    />
                  ))}
                </div>
                {touched.coverPreexistingCondition && errors.coverPreexistingCondition && (
                  <span className="text-red text-sm mt-1 block w-fit">{errors.coverPreexistingCondition}</span>
                )}
              </div>
            </div>

            {!values.coverPreexistingCondition && values.name && (
              <>
                <div className={cn("mt-10 !items-start", formRow)}>
                  <div className="lg:min-w-[420px] sm:w-[40%]">
                    <label className={cn("!w-full", formRowLabel)}>Has {values.name} been neutered / Sprayed</label>
                    <HelpTooltip
                      className="mt-3"
                      toolTipId="cover-extra-activities-tooltip"
                      toolTipContent="Neutering / spaying is the process of removing your pet's ability to reproduce. This procedure is carried out by a vet, usually when the animal is young."
                    />
                  </div>

                  <div className="flex-1 lg:max-w-[490px] w-full">
                    <div className="w-full flex flex-wrap gap-6">
                      {Object.values(YesOrNoEnums).map((i) => (
                        <OptionsPill
                          key={i}
                          className="flex-1"
                          label={titleCase(formatEnum(i))}
                          value={i}
                          selectedValue={values.hasBeenNeutered ? "YES" : "NO"}
                          onSelect={(val) => setFieldValue("hasBeenNeutered", val === YesOrNoEnums.YES ? true : false)}
                        />
                      ))}
                    </div>
                    {touched.hasBeenNeutered && errors.hasBeenNeutered && (
                      <span className="text-red text-sm mt-1 block w-fit">{errors.hasBeenNeutered}</span>
                    )}
                  </div>
                </div>

                <div className={cn("mt-10 !items-start", formRow)}>
                  <div className="lg:min-w-[420px] sm:w-[40%]">
                    <label className={cn(formRowLabel, "!w-full")}>Has {values.name} been chipped?</label>
                    <HelpTooltip
                      className="mt-3"
                      toolTipId="cover-extra-activities-tooltip"
                      toolTipContent="A microchip is a small implant placed under the skin of an animal and contains a unique identification number. Microchips are commonly used to help identify pets if they become lost or stolen."
                    />
                  </div>

                  <div className="flex-1 lg:max-w-[490px] w-full">
                    <div className="w-full flex flex-wrap gap-6">
                      {Object.values(YesOrNoEnums).map((i) => (
                        <OptionsPill
                          key={i}
                          className="flex-1"
                          label={titleCase(formatEnum(i))}
                          value={i}
                          selectedValue={values.hasBeenChipped ? "YES" : "NO"}
                          onSelect={(val) => setFieldValue("hasBeenChipped", val === YesOrNoEnums.YES ? true : false)}
                        />
                      ))}
                    </div>
                    {touched.hasBeenChipped && errors.hasBeenChipped && (
                      <span className="text-red text-sm mt-1 block w-fit">{errors.hasBeenChipped}</span>
                    )}
                  </div>
                </div>

                <div className={cn("mt-10 !items-start", formRow)}>
                  <div className="lg:min-w-[420px] sm:w-[40%]">
                    <label className={cn(formRowLabel, "!w-full")}>Are {values.name}’s vaccines up to date?</label>
                    <HelpTooltip
                      className="mt-3"
                      toolTipId="cover-extra-activities-tooltip"
                      toolTipContent="Although pets do not need to be vaccinated in order to be insured, if your pet happens to suffer from an illness which could have been prevented by the administration of a 'routine' vaccine then the insurer may refuse to pay the claim. It's important to read the terms and conditions carefully."
                    />
                  </div>

                  <div className="flex-1 lg:max-w-[490px] w-full">
                    <div className="w-full flex flex-wrap gap-6">
                      {Object.values(YesOrNoEnums).map((i) => (
                        <OptionsPill
                          key={i}
                          className="flex-1"
                          label={titleCase(formatEnum(i))}
                          value={i}
                          selectedValue={values.vaccineUpToDate ? "YES" : "NO"}
                          onSelect={(val) => setFieldValue("vaccineUpToDate", val === YesOrNoEnums.YES ? true : false)}
                        />
                      ))}
                    </div>
                    {touched.vaccineUpToDate && errors.vaccineUpToDate && (
                      <span className="text-red text-sm mt-1 block w-fit">{errors.vaccineUpToDate}</span>
                    )}
                  </div>
                </div>

                <div className={cn("mt-10 !items-start", formRow)}>
                  <div className="lg:min-w-[420px] sm:w-[40%]">
                    <label className={cn(formRowLabel, "!w-full")}>
                      Has {values.name} ever shown signs of aggression?
                    </label>
                    <p className={cn(formRowInfo, "!w-full")}>
                      This includes attacking or bitting a person or another animal, or shown signs of aggressive
                      tendencies.
                    </p>
                  </div>

                  <div className="flex-1 lg:max-w-[490px] w-full">
                    <div className="w-full flex flex-wrap gap-6">
                      {Object.values(YesOrNoEnums).map((i) => (
                        <OptionsPill
                          key={i}
                          className="flex-1"
                          label={titleCase(formatEnum(i))}
                          value={i}
                          selectedValue={values.hasShownSignsOfAggression ? "YES" : "NO"}
                          onSelect={(val) =>
                            setFieldValue("hasShownSignsOfAggression", val === YesOrNoEnums.YES ? true : false)
                          }
                        />
                      ))}
                    </div>
                    {touched.hasShownSignsOfAggression && errors.hasShownSignsOfAggression && (
                      <span className="text-red text-sm mt-1 block w-fit">{errors.hasShownSignsOfAggression}</span>
                    )}
                  </div>
                </div>

                <div className={cn("mt-10 !items-start", formRow)}>
                  <div className="lg:min-w-[420px] sm:w-[40%]">
                    <label className={cn(formRowLabel, "!w-full")}>
                      Has {values.name} been the subject of any complaints or legal action during the last 5 years?
                    </label>
                  </div>

                  <div className="flex-1 lg:max-w-[490px] w-full">
                    <div className="w-full flex flex-wrap gap-6">
                      {Object.values(YesOrNoEnums).map((i) => (
                        <OptionsPill
                          key={i}
                          className="flex-1"
                          label={titleCase(formatEnum(i))}
                          value={i}
                          selectedValue={values.hasBeenSubjectOfLegalComplaint ? "YES" : "NO"}
                          onSelect={(val) =>
                            setFieldValue("hasBeenSubjectOfLegalComplaint", val === YesOrNoEnums.YES ? true : false)
                          }
                        />
                      ))}
                    </div>
                    {touched.hasBeenSubjectOfLegalComplaint && errors.hasBeenSubjectOfLegalComplaint && (
                      <span className="text-red text-sm mt-1 block w-fit">{errors.hasBeenSubjectOfLegalComplaint}</span>
                    )}
                  </div>
                </div>
              </>
            )}

            {Object.values(errors).length > 0 && Object.values(touched).some((v) => !!v) && (
              <p className="mt-8 text-red text-lg font-medium">* Kindly fill all fields</p>
            )}

            {!values.coverPreexistingCondition && (
              <Button type="submit" intent="outline" className="mt-10 w-[194px]">
                Save
              </Button>
            )}

            {/* <Button
              type="button"
              disabled={isNextPageDisabled}
              className="w-full mt-[100px] sm:max-w-[80%] mx-auto"
              onClick={() => router.push("/start-a-quote/pet-details/list")}
            >
              Continue to Next page
            </Button> */}
          </form>
        );
      }}
    </Formik>
  );
}
