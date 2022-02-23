import "./style.css";
import { IProps } from "./types";

export const Time = ({ formatMin, formatSec }: IProps) => {
  return (
    <p className="time">
      {formatMin} : {formatSec}
    </p>
  );
};
