import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = ({ record, deleteRecord }) => (
  <tr className="border-b transition-colors hover:bg-muted/50">
    <td className="p-4">{record.name}</td>
    <td className="p-4">{record.position}</td>
    <td className="p-4">{record.level}</td>
    <td className="p-4">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1"
          to={`/edit/${record._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded px-3 py-1"
          type="button"
          onClick={() => deleteRecord(record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // Fetch records from the server
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setRecords(data);
    }
    getRecords();
  }, []);

  // Delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id));
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="h-12 px-4 text-left font-medium text-gray-700">Name</th>
                <th className="h-12 px-4 text-left font-medium text-gray-700">Position</th>
                <th className="h-12 px-4 text-left font-medium text-gray-700">Level</th>
                <th className="h-12 px-4 text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <Record
                  key={record._id}
                  record={record}
                  deleteRecord={deleteRecord}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
