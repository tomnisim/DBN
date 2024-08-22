import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ShiftsTable from "../Components/Table";
import Calendar from "./Calender";
const FutureShiftsWindow: React.FC = () => {
  return (
    <div>
      <h1>Future Shifts</h1>
      <Calendar></Calendar>
    </div>
  );
};

export default FutureShiftsWindow;
