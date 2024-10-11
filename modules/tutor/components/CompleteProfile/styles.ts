export const customStyles = {
  control: (provided: any, state: any) => {
    const border = state.isFocused
      ? "1px solid #671A5629"
      : "1px solid #671A5629";

    return {
      ...provided,
      border,
      borderRadius: "16px",
      padding: "2px 10px",
      outline: "none",
      maxHeight: "50px",
      overflow: "hidden",
    };
  },

  valueContainer: (provided: any) => ({
    ...provided,
    "flex-wrap": "nowrap",
    "white-space": "nowrap",
    overflow: "hidden",
    "text-overflow": "ellipsis",
  }),
};
