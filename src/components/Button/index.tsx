import React from "react";
import { IProps } from "./types";
import "./style.css";

export const Button = ({ text, onClick }: IProps) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};
