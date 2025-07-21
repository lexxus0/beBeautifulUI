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
  return (
    <div className={styles.inputGroup}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${value ? styles.filled : ""} ${
          error ? styles.errorInput : ""
        }`}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      {showToggle && (
        <span className={styles.toggle} onClick={onToggle}>
          {type === "password" ? <IoEyeSharp size={18}/> : <BsFillEyeSlashFill size={18}/>}
        </span>
      )}

      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
};

export default InputGroup;
