"use client";

import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { FC } from "react";
import { InputGroupProps } from "@/types/types";
import styles from "./InputGroup.module.scss";
import clsx from "clsx";

const InputGroup: FC<InputGroupProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  showToggle,
  onToggle,
  variant = "default",
  inputClassName,
  labelClassName,
  icon,
}) => {
  const isPassword = type === "password";
  const hasError = Boolean(error);
  const isDefault = variant === "default";

  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputWrapper}>
        {!hasError && icon && <span>{icon}</span>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={clsx(
            isDefault && styles.input,
            value && styles.filled,
            hasError && styles.errorInput,
            inputClassName,
          )}
        />

        <label
          htmlFor={id}
          className={clsx(isDefault && styles.label, labelClassName)}
        >
          {label}
        </label>

        {hasError && <span className={styles.errorIcon}>!</span>}

        {showToggle && onToggle && (
          <span
            className={`${styles.toggle} ${hasError ? styles.toggleError : ""}`}
            onClick={onToggle}
          >
            {isPassword ? (
              <IoEyeSharp size={18} />
            ) : (
              <BsFillEyeSlashFill size={18} />
            )}
          </span>
        )}
      </div>
      {hasError && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
};

export default InputGroup;
