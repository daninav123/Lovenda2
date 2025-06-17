import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FinanceEntry } from '../store/financeSlice';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from 'recharts';
import jsPDF from 'jspdf';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FinancePage: React.FC = () => {
  const entries = useSelector((state: RootState) => state.finance.entries);
  const [filter, setFilter] = useState('');
  const [period, setPeriod] = useState('all');

  const filtered = entries.filter(e =>
    (e.item.toLowerCase().includes(filter.toLowerCase()) ||
     e.category.toLowerCase().includes(filter.toLowerCase())) &&
    (period === 'all' || e.date.startsWith(period))
  );

  const exportCSV = () => {
    const header = 'id,item,category,vendor,budgetedCost,actualCost,date,status\n';
    const rows = filtered.map(e =>
      `${e.id},${e.item},${e.category},${e.vendor},${e.budgetedCost},${e.actualCost},${e.date},${e.status}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'finance.csv';
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Finance Summary', 10, 10);
    doc.text(`Entries: ${filtered.length}`, 10, 20);
    doc.save('finance.pdf');
  };

  return (
    <div>
      <h1>Finance</h1>
      <input
        placeholder="Filter by item or category"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <select value={period} onChange={e => setPeriod(e.target.value)}>
        <option value="all">All</option>
        {/* Example periods: YYYY-MM */}
        {[...new Set(entries.map(e => e.date.slice(0,7)))].map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <button onClick={exportCSV}>Export CSV</button>
      <button onClick={exportPDF}>Export PDF</button>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Vendor</th>
            <th>Budgeted</th>
            <th>Actual</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(e => (
            <tr key={e.id}>
              <td>{e.item}</td>
              <td>{e.category}</td>
              <td>{e.vendor}</td>
              <td>{e.budgetedCost}</td>
              <td>{e.actualCost}</td>
              <td>{e.date}</td>
              <td>{e.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <LineChart width={300} height={200} data={filtered}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="budgetedCost" stroke="#8884d8" name="Budgeted" />
          <Line type="monotone" dataKey="actualCost" stroke="#82ca9d" name="Actual" />
        </LineChart>

        <BarChart width={300} height={200} data={filtered}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budgetedCost" stackId="a" fill="#8884d8" name="Budgeted" />
          <Bar dataKey="actualCost" stackId="a" fill="#82ca9d" name="Actual" />
        </BarChart>

        <PieChart width={300} height={200}>
          <Pie
            data={filtered}
            dataKey="actualCost"
            nameKey="item"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {filtered.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default FinancePage;
