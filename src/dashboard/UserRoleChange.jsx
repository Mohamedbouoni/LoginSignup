const UserRoleChange = ({ userId }) => {
    const [newRole, setNewRole] = useState('');
  
    const handleRoleChange = () => {
      if (!newRole) return;
      changeUserRole(userId, newRole);
    };
  
    return (
      <div>
        <select onChange={(e) => setNewRole(e.target.value)} value={newRole}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button onClick={handleRoleChange}>Change Role</button>
      </div>
    );
  };