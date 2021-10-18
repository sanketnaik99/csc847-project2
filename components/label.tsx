import React from "react";

interface Props {
  label: string;
}

const LabelBadge: React.FC<Props> = ({ label }) => {
  return (
    <span
      className={[
        "text-sm font-semibold inline-block py-1 px-3 uppercase rounded-full",
        label == "Animal"
          ? "text-blue-500 bg-blue-200"
          : label == "Flower"
          ? "text-green-700 bg-green-200"
          : label == "People"
          ? "text-yellow-600 bg-yellow-100"
          : "text-red-600 bg-red-100",
      ].join(" ")}
    >
      {label}
    </span>
  );
};

export default LabelBadge;
