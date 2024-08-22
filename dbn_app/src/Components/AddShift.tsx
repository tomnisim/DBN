// src/components/Home.tsx
import React from 'react';
import { useUser } from './AdminContext';

const AddShift = () => {
  const { user, updateUser } = useUser();
  const isAdmin = user.isAdmin;
  return <>
      <h2> Add Shift</h2>
      {/* <ToggleBar></ToggleBar> */}
      {/* <Calendar></Calendar> */}
  </>;
};

export default AddShift;
