import { Controller, useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ProfileFormInputs,
  schemaProfile,
} from "@/validation/profileValidation";
import { useRouter } from "next/navigation";
import InputGroup from "../../InputGroup/InputGroup";
import Icon from "@/components/shared/Icon";
import DatePickerField from "../DatePickerField/DatePickerField";
import { useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/auth/operations";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { IUser } from "@/types/types";
import {
  formatToSwaggerDate,
  parseSwaggerDate,
} from "@/helpers/covertDateToString";
import styles from "./ProfileForm.module.scss";

type ProfileFormProp = {
  user: IUser;
};

const fields: {
  name: keyof ProfileFormInputs;
  label: string;
  type?: "text" | "password";
}[] = [
  { name: "first_name", label: "Імʼя" },
  { name: "last_name", label: "Прізвище" },
  { name: "dateOfBirth", label: "День/Місяць/Рік" },
  { name: "telephone", label: "Телефон" },
  { name: "email", label: "E-mail" },
  { name: "password", label: "Пароль", type: "password" },
];

export const toU = <T,>(v: T | null | undefined): T | undefined =>
  v == null ? undefined : v;

export default function ProfileForm({ user }: ProfileFormProp) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [imageError, setImageError] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(schemaProfile) as Resolver<ProfileFormInputs>,
    defaultValues: {
      photo: null,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      dateOfBirth: parseSwaggerDate(user.dateOfBirth),
      telephone: user.telephone || "",
      email: user.email || "",
      password: "",
    },
  });

  const avatarFile = watch("photo");

  const previewSrc = useMemo(() => {
    if (avatarFile instanceof File) {
      return URL.createObjectURL(avatarFile);
    }

    if (user.photo) {
      return user.photo;
    }
    return null;
  }, [avatarFile, user.photo]);

  useEffect(() => {
    if (avatarFile instanceof File) {
      const url = previewSrc!;
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [avatarFile, previewSrc]);

  useEffect(() => {
    if (!previewSrc || !previewSrc.startsWith("blob:")) return;

    return () => {
      URL.revokeObjectURL(previewSrc);
    };
  }, [previewSrc]);

  const canRenderImage = !!previewSrc && !imageError;

  const onSubmit = (data: ProfileFormInputs) => {
    const payload = {
      first_name: toU(data.first_name),
      last_name: toU(data.last_name),
      dateOfBirth: data.dateOfBirth
        ? formatToSwaggerDate(data.dateOfBirth) // "DD.MM.YYYY"
        : undefined,
      telephone: toU(data.telephone),
      email: toU(data.email),
      password: toU(data.password),
      photo: data.photo ?? null,
    };

    dispatch(updateUser(payload));
    router.push("/");
  };

  const renderIcon = (
    <Icon
      name="icon-edit"
      className="w-[18px] h-[18px] absolute right-3 top-1/2 -translate-y-1/2"
    />
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="w-full md:w-[436px] lg:w-full flex flex-col mb-10 md:mb-8 lg:flex-row lg:gap-[134px] lg:items-center mx-auto lg:mx-0 lg: relative"
    >
      <div className="w-45 mx-auto mb-12 md:mb-[50px] lg:w-[306px] lg:flex gap-[134px] items-center lg:mb-0 relative">
        <div className="relative w-45 h-45 lg:w-[306px] lg:h-[306px] shrink-0">
          {canRenderImage ? (
            <Image
              src={previewSrc as string}
              alt={user.first_name || "User"}
              fill
              unoptimized
              className="w-45 h-45 rounded-lg lg:w-[306px] lg:h-[306px] object-cover mx-auto"
              onError={() => setImageError(true)}
            />
          ) : (
            <span
              className="w-45 h-45 lg:w-[306px] lg:h-[306px] rounded-lg border-1 border-black-10 bg-gray-10
          text-7xl font-medium text-white-30 flex items-center justify-center mx-auto lg:mx-0"
            >
              {(user?.first_name
                ? user.first_name[0]
                : user?.email
                ? user.email[0]
                : "U"
              ).toUpperCase()}
            </span>
          )}
        </div>

        <Controller
          name="photo"
          control={control}
          render={({ field: { onChange } }) => (
            <div className="flex flex-col gap-2">
              <label htmlFor="photo" className={styles.editPhoto}>
                <Icon name="icon-edit" className="w-[19px] h-[19px]" />
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  onChange(file);
                }}
                style={{ display: "none" }}
              />
            </div>
          )}
        />
      </div>
      <div className="lg:w-[856px] flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-y-10 lg:gap-x-8">
        {fields.map(({ name, label, type }) => {
          if (name === "dateOfBirth") {
            return (
              <Controller
                key="dateOfBirth"
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePickerField
                    id="date"
                    label={label}
                    value={field.value}
                    onChange={field.onChange}
                    inputClassName={styles.input}
                  />
                )}
              />
            );
          }
          return (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field: { name: fieldName, value, onChange } }) => {
                const stringValue = (value ?? "") as string;
                const hasValue = stringValue.length > 0;
                return (
                  <InputGroup
                    id={name}
                    name={fieldName}
                    label={label}
                    type={type}
                    variant="custom"
                    error={errors[name]?.message}
                    value={stringValue}
                    onChange={onChange}
                    icon={renderIcon}
                    inputClassName={`${styles.input} ${
                      hasValue ? styles.hasValue : ""
                    }`}
                    labelClassName={styles.label}
                  />
                );
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-6 mt-10 lg:absolute -bottom-[120px] lg:left-1/2 lg:-translate-x-1/2 lg:flex-row lg:mt-0 ">
        <button
          type="submit"
          aria-label="Зберегти зміни"
          className={styles.btnSubmit}
        >
          Зберегти зміни
        </button>
        <button
          type="button"
          aria-label="Скасувати зміни"
          onClick={() => {
            reset();
            router.push("/");
          }}
          className={styles.btn}
        >
          Скасувати зміни
        </button>
      </div>
    </form>
  );
}
