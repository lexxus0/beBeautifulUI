import { forwardRef, InputHTMLAttributes, useMemo } from "react";
import DatePicker from "react-datepicker";
import Icon from "@/components/shared/Icon";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePickerField.module.scss";

type DatePickerFieldProps = {
  id: string;
  label?: string;
  value?: Date | null;
  onChange: (d: Date | null) => void;
  inputClassName?: string;
  labelClassName?: string;
};

const CalendarInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    id?: string;
    label?: string;
    hasValue?: boolean;
  }
>(({ id, value, onClick, className, label, hasValue, ...rest }, ref) => (
  <div
    className={`${styles.inputField} ${hasValue ? styles.filled : ""} relative`}
  >
    <input
      ref={ref}
      id={id}
      value={(value as string) || ""}
      onClick={onClick}
      readOnly
      placeholder=" "
      className={`${styles.input} ${className ?? ""}`}
      {...rest}
    />
    <span className={styles.label}>{label}</span>
    <Icon
      name="icon-calendar"
      className="w-[22px] h-[22px] absolute right-3 top-1/2 -translate-y-1/2"
    />
  </div>
));
CalendarInput.displayName = "CustomInput";

export default function DatePickerField({
  id,
  label,
  value,
  onChange,
  inputClassName,
}: DatePickerFieldProps) {
  const maxDate = new Date();
  const maxYear = maxDate.getFullYear();

  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );
  return (
    <div className="relative z-10">
      <DatePicker
        selected={value ?? null}
        onChange={(d) => onChange(d)}
        dateFormat="dd.MM.yyyy"
        dropdownMode="scroll"
        showYearDropdown={false}
        showMonthDropdown={false}
        formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3).toUpperCase()}
        maxDate={maxDate}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          decreaseYear,
          nextMonthButtonDisabled,
        }) => {
          const y = date.getFullYear();
          const m = date.getMonth();

          const disableNextYear = y >= maxYear;
          const disableNextMonth =
            nextMonthButtonDisabled ||
            (y === maxYear && m >= maxDate.getMonth());

          return (
            <div
              className={styles.header}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={decreaseYear}
                  className={styles.navBtn}
                  aria-label="Попередній рік"
                >
                  <Icon name="icon-double-arrow" className="w-[18px] h-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={decreaseMonth}
                  className={styles.navBtn}
                  aria-label="Попередній місяць"
                >
                  <Icon name="icon-arrow-down" className="w-[10px] h-[10px] rotate-90" />
                </button>
              </div>
              <div className={styles.title}>
                <span className={styles.month}>{months[m]}</span>

                <span className={styles.year}>{y}</span>
              </div>

              <div className="flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => !disableNextMonth && increaseMonth()}
                  disabled={disableNextMonth}
                  className={styles.navBtn}
                  aria-label="Наступний місяць"
                >
                  <Icon name="icon-arrow-down" className="w-[10px] h-[10px] -rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => !disableNextYear && changeYear(y + 1)}
                  disabled={disableNextYear}
                  className={styles.navBtn}
                  aria-label="Наступний рік"
                >
                  <Icon
                    name="icon-double-arrow"
                    className="w-[18px] h-[18px] rotate-180"
                  />
                </button>
              </div>
            </div>
          );
        }}
        calendarClassName={styles.calendar}
        dayClassName={() => styles.day}
        weekDayClassName={() => styles.weekday}
        wrapperClassName={styles.inputWrapper}
        customInput={
          <CalendarInput
            id={id}
            className={inputClassName}
            label={label}
            hasValue={!!value}
          />
        }
      />
    </div>
  );
}
