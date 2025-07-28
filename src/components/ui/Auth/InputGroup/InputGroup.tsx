"use client";

import styles from "./InputGroup.module.scss";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { FC } from "react";
import { InputGroupProps } from "@/types/types";

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
}) => {
  const isPassword = type === "password";
  const hasError = Boolean(error);

  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${value ? styles.filled : ""} ${
            hasError ? styles.errorInput : ""
          }`}
        />

        <label htmlFor={id} className={styles.label}>
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
