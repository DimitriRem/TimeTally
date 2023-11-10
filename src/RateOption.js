import React from "react";

const RateOption = ({ rate, id, label }) => {
  return (
    <option value={id}>
      ${rate}/hr {label}
    </option>
  );
};

export default RateOption;
