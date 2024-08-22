import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './AdminContext';
import Button from './Button';
import { tableDataType } from './Home';
import { Shift } from './Home';
type TableProps = {
  data: Shift[]
}
const Table: React.FC<TableProps> = ({ data } : TableProps) => {
  const { user, updateUser } = useUser();
  const isAdmin = user.isAdmin;
  const [filter, setFilter] = useState<string>('no filter');
  const [tableData, setTableData] = useState<tableDataType[]>([]);
  const create_table_data = () =>{
    console.log("create table data")
    const table_data :tableDataType[]= data.map((shift) => ({
      date: shift.date,
      location: shift.location,
      employees: {current:shift.employees.length, needed:shift.employees.length},
      details: `detailes for shift id: ${shift.id}`,
      id:shift.id
    }));

    setTableData(table_data);
  } 
  useEffect(()=>{
    create_table_data()
  }, [])
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  
  const handleDeleteAllShifts = () => {
    
  };
  

  const filteredData = tableData.filter((row:tableDataType) => {
    if (filter === 'my shifts') {
      // Add your logic for filtering "my shifts"
      return true;
    }
    if (filter === 'available shifts') {
      return row.employees.current < row.employees.needed;
    }
    return true;
  });

  const get_shift_by_id = (shifts:Shift[], id :string)=>{
    const shift = shifts.filter((shift:Shift) => shift.id === id)[0] 
    console.log(shift)
    return shift
  }


  return (
    <div>
      <div style={filterContainerStyle}>
        <select value={filter} onChange={handleFilterChange} style={selectStyle}>
          <option value="my shifts">My Shifts</option>
          <option value="available shifts">Available Shifts</option>
          <option value="no filter">No Filter</option>
        </select>
        <button style={filterButtonStyle}>Filter</button>
      </div>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Date</th>
              <th style={headerCellStyle}>Location</th>
              <th style={headerCellStyle}>Employees</th>
              <th style={headerCellStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} style={rowStyle}>
                <td style={cellStyle}>{row.date}</td>
                <td style={cellStyle}>{row.location}</td>
                <td style={cellStyle}>
                  {row.employees.current} / {row.employees.needed}
                </td>
                <td style={cellStyle}>
                  <Button onClick={()=>{{console.log(row)}}}>EEE</Button>
                  <Link to={`/ShiftWindow/${row.id}`} state={{ shift: get_shift_by_id(data, row.id)}} style={linkStyle}>
                    
                    {row.details}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      {isAdmin ?  <Link to={`/AddShift`} style={linkStyle}>Add Shift
                  </Link> : undefined}
                  </div>
      {isAdmin ?  <Button color='red' onClick={handleDeleteAllShifts}>Delete All Shifts</Button> : undefined}
    </div>
  );
};

const filterContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '1rem',
};

const selectStyle: React.CSSProperties = {
  marginRight: '1rem',
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const filterButtonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
};

const tableContainerStyle: React.CSSProperties = {
  overflowX: 'auto',
  margin: '1rem 0',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const headerCellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f4f4f4',
  textAlign: 'left',
};

const rowStyle: React.CSSProperties = {
  border: '1px solid #ddd',
};

const cellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
};

const linkStyle: React.CSSProperties = {
  color: '#007bff',
  textDecoration: 'none',
};

export default Table;
