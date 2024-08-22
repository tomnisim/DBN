import Input from './Input.tsx';
import Form from './Form.tsx';
import Button from './Button.tsx';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const FillShiftSummary:FC = ()=> {
  const { user_id, shift_id } = useParams<{ user_id: string; shift_id: string }>();
  console.log(user_id)
  console.log(shift_id)
  function handleSave(data: unknown) {
    const extractedData = data as { name: string; age: string };
    console.log(extractedData);
  }

  // Dummy shift data (replace with actual data)
  const shiftData = {
    customer: 'Customer Name',
    shiftType: 'Shift Type',
    date: '2023-12-25',
    startTime: '08:00',
    endTime: '16:00'
  };


  return (
    <>
      <h1>Report Shift</h1>
      <Form onSave={handleSave}>
        <Input
          type="text"
          label="Customer"
          id="customer"
          value={shiftData.customer}
          readOnly
        />
        <Input
          type="text"
          label="Shift Type"
          id="shiftType"
          value={shiftData.shiftType}
          readOnly
        />
        <Input
          type="date"
          label="Date"
          id="date"
          value={shiftData.date}
          readOnly
        />
        <Input
          type="time"
          label="Start Time"
          id="startTime"
          value={shiftData.startTime}
          readOnly
        />
        <Input
          type="time"
          label="End Time"
          id="endTime"
          value={shiftData.endTime}
          readOnly
        />
        <Input type="number" label="Distance(km)" id="distance" />
        <Input type="number" label="Transport Payment" id="transportPayment" />
        <Input type="number" label="Food Payment" id="foodPayment" />
        <Input type="number" label="Parking Payment" id="parkingPayment" />
        <p>
          <Button>Attach Files</Button>
        </p>
        <p>
          <Button>Save</Button>
        </p>
      </Form>
    </>
  );
}


export default FillShiftSummary;