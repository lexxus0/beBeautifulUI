import Select, { SingleValue } from "react-select";

interface CustomSelectProps {
  value: string | undefined;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (option: SingleValue<{ value: string; label: string }>) => void;
  onBlur?: () => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  placeholder,
  onChange,
  onBlur,
}) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      value={options.find((opt) => opt.value === value) || null}
      onChange={onChange}
      onBlur={onBlur}
      isClearable
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: "transparent",
          borderRadius: "8px",
          border: "0.4px solid #2d2d2d",
          boxShadow: "none",
          height: "44px",
          width: "208px",
          display: "flex",
          alignItems: "center",
          zIndex: 999999,
          position: "relative",
          "&:hover": {
            borderColor: "#2d2d2d",
          },
          "&:focus": {
            borderColor: "#2d2d2d",
            boxShadow: "none",
          },
          "@media (min-width: 744px)": {
            width: "208px",
            height: "44px",
          },
          "@media (min-width: 1440px)": {
            width: "230px",
            height: "48px",
          },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#e0e0e0" : "transparent",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
          padding: "10px 15px",
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: "#2d2d2d",
          padding: "0",
          marginLeft: "8px",
          paddingRight: "8px",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#2d2d2d",
        }),
        placeholder: (provided) => ({
          ...provided,
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: "150%",
          letterSpacing: "0.02em",
          color: "#2d2d2d",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
      }}
    />
  );
};

export default CustomSelect;
