import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const RoleStatsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/users/role-stats')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching role stats:', error));
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">User Role Stats by Date</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="admin" stackId="a" fill="#8884d8" />
          <Bar dataKey="user" stackId="a" fill="#82ca9d" />
          <Bar dataKey="recruiter" stackId="a" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoleStatsChart;
