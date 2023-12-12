"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Filter() {
  const filterLevel = [
    { id: 1, label: "Beginner", value: "beginner" },
    { id: 2, label: "Intermediate", value: "intermediate" },
    { id: 3, label: "Advance", value: "advance" },
  ];

  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };

  return (
    <div className="ms-10">
      <RadioGroup defaultValue="">
        {filterLevel.map((item) => (
          <div
            className="flex items-center space-x-2"
            key={item.id}
          >
            <RadioGroupItem
              value={item.value}
              className={`w-6 h-6 ${selectedValue === item.value ? "bg-success" : ""}`}
              onChange={() => handleRadioChange(item.value)}
            />
            <Label htmlFor={item.value}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default Filter;
