"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const StoreEarningsChart = ({ salesData }) => {
  const [selectedStore, setSelectedStore] = useState("");

  // Assuming `salesData` is already preprocessed
  const stores = [
    ...new Set(salesData.map((data: { store: any }) => data.store)),
  ].sort();

  const handleStoreChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedStore(event.target.value);
  };

  // Filter data based on selected store
  const filteredData = salesData.filter(
    (data: { store: string }) => data.store === selectedStore
  );

  return (
    <div>
      <select onChange={handleStoreChange} value={selectedStore}>
        <option value="">Select a Store</option>
        {stores.map((store) => (
          <option key={store} value={store}>{`Store ${store}`}</option>
        ))}
      </select>

      {selectedStore && (
        <LineChart
          width={500}
          height={300}
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
        </LineChart>
      )}
    </div>
  );
};

export default StoreEarningsChart;
