import React, { useEffect, useState } from "react";
import { Link, useParams , useLocation } from "react-router-dom";
import { linkStyle } from "./Navigation.tsx";
import Button from "./Button.tsx";
import { useUser } from "./AdminContext";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import { MdRemoveCircle } from "react-icons/md";
import { post_start_shift,post_join_shift,  Response } from "../API/UserAPI.ts";
import {
  FullScreenCard,
  Card,
  Title,
  Info,
  InfoTitle,
  EmployeeList,
  EmployeeItem,
  FlexContainer,
} from "./ShiftWindow.ts";

type Time = {
  hours: string;
  minutes: string;
};

export type ShiftWindowProps = {
  shiftId: number;
  date: Date;
  day: string;
  shiftType: string;
  customer: string;
  startTime: Time;
  location: string;
  numEmployees: number;
  employeesNames: string[];
  children?: React.ReactNode;
};

export default function ShiftWindow() {
  const { user, updateUser } = useUser();
  const isAdmin = user.isAdmin;
  const { shift_id } = useParams<{ shift_id: string }>();
  const loc = useLocation();
  console.log(shift_id);
  // const {
  //   shiftId,
  //   date,
  //   day,
  //   shiftType,
  //   customer,
  //   startTime,
  //   location,
  //   numEmployees,
  //   employeesNames,
  //   children,
  // } = props;
  
  
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [myShift, setMyShift] = useState(true); // TODO: get this value initially from server
  const [shift, setShift] = useState(loc.state?.shift);
  useEffect(()=>setMyShift(shift.employees.includes(user.userId) ), [shift])
  console.log(shift)
  const HandleStartShift = async (): Promise<void> => {
    
    const response: Response | null = await post_start_shift(user.userId, shift_id!);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
      setStarted(true);
      console.log(response);
    } else {
      alert(response.message);
    }
  };

  const HandleEndShift = () => {
    setFinished(true);
    //TODO - save shift with current end time
  };

  const HandleJointoShift = async (): Promise<void> => {

    const response: Response | null = await post_join_shift(user.userId, shift_id!);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
      setMyShift(true);
      console.log(response);
    } else {
      alert(response.message);
    }
      };

  const HandleEditShift = () => {
    //TODO - Edit shift
  };

  const HandleDeleteShift = () => {
    //TODO - delete shift
  };

  return (
    <Card>
      <Title>{shift.type_of_shift} Shift</Title>
      <Info>
        <InfoTitle>Shift ID:</InfoTitle> {shift.id}
      </Info>
      <Info>
        <InfoTitle>Date:</InfoTitle> {shift.date}
      </Info>
      <Info>
        <InfoTitle>Day:</InfoTitle> {shift.day}
      </Info>
      <Info>
        <InfoTitle>Customer:</InfoTitle> {shift.client}
      </Info>
      {/* <Info>
        <InfoTitle>Start Time:</InfoTitle>{" "}
        {`${startTime.hours}:${startTime.minutes}`}
      </Info> */}
      <Info>
        <InfoTitle>Start Time:</InfoTitle>{" "}
        {shift.beginning_time}
      </Info>
      <Info>
        <InfoTitle>Location:</InfoTitle> {shift.location}
      </Info>
      <Info>
        <InfoTitle>Number of Employees:</InfoTitle> {shift.employees.length}
      </Info>
      <Info>
        <FlexContainer>
          <InfoTitle>Employees:</InfoTitle>{" "}
          <IoMdAddCircle
            style={{ color: "green", width: "30px", height: "30px" }}
          />{" "}
        </FlexContainer>

        <EmployeeList>
          {shift.employees.map((name:string, index:number) => (
            <FlexContainer key={index}>
              <EmployeeItem>{name}</EmployeeItem>
              {isAdmin ? (
                <CiCircleRemove
                  style={{ color: "red", width: "80px", height: "80px" }}
                  onClick={HandleEditShift}
                />
              ) : null}
            </FlexContainer>
          ))}
        </EmployeeList>
      </Info>
      {isAdmin ? (
        <div>
          <Button onClick={HandleEditShift}>Edit Shift</Button>
          <Button color={"red"} onClick={HandleDeleteShift}>
            Delete Shift
          </Button>
        </div>
      ) : (
        <div>
         
          {!myShift ? (
            <Button onClick={HandleJointoShift}>Join to Shift</Button>
          ) : undefined}
          {started && myShift ? (
            <Button onClick={HandleEndShift}>End Shift</Button>
          ) : undefined}
          {!started && myShift ? (
            <Button onClick={HandleStartShift}>Start Shift</Button>
          ) : undefined}
          {finished && myShift ? (
            <Link
              to={`/FillShiftSummary/${shift_id}`}
              style={linkStyle}
            >
              Fill Shift Summary
            </Link>
          ) : undefined}
        </div>
      )}
    </Card>
  );
}
