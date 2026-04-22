import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { adminApi } from "../../services/api";

const AdminUsersPage = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    adminApi.getUsers().then(({ data }) => setUsers(data));
  }, []);

  if (!users) return <Loader />;

  return (
    <div className="panel overflow-hidden">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/5">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t border-white/5">
              <td className="px-4 py-3 text-white">{user.name}</td>
              <td className="px-4 py-3 text-slate-300">{user.email}</td>
              <td className="px-4 py-3 text-slate-300">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
