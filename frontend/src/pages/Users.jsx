import { useEffect, useState } from "react";
import axios from "../utils/axios";


export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>

      <table className="w-full bg-white dark:bg-gray-800 rounded">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td className="font-semibold">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
