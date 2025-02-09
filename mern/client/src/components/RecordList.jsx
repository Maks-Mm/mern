import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; // Import PropTypes

// Record component to display individual record
const Record = (props) => {
  if (!props.record) {
    return (
      <tr>
        <td colSpan="4" className="text-center p-4 text-red-500">
          Error: Record data is missing
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.name || "N/A"}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.position || "N/A"}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.level || "N/A"}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <div className="flex gap-2">
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to={`/edit/${props.record._id || ""}`}
          >
            Edit
          </Link>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
            color="red"
            type="button"
            onClick={() => {
              if (props.record._id) props.deleteRecord(props.record._id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

// Define PropTypes for the Record component
Record.propTypes = {
  record: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    position: PropTypes.string,
    level: PropTypes.string,
  }).isRequired,
  deleteRecord: PropTypes.func.isRequired,
};

// RecordList component to manage the state and display the table of records
export default function RecordList() {
  const [records, setRecords] = useState([]);

  // Fetch the records from the database
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
  }, []); // Empty dependency array ensures this runs once on mount

  // Method to delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // Method to map out the records in the table
  function recordList() {
    if (!records || records.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center p-4">
            No records found
          </td>
        </tr>
      );
    }

    return records.map((record) => (
      <Record
        record={record} // Ensure this is defined
        deleteRecord={deleteRecord} // Pass the function directly
        key={record._id}
      />
    ));
  }

  // Render the table with the records
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Position
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Level
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
