"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AllStoresEarningsChart = ({ salesData }) => {
  // This component expects `salesData` to be an array of objects
  // Each object should have at least the `store`, `date` (as YYYY-MM), and `earnings` properties

  return (
    <LineChart
      width={500}
      height={300}
      data={salesData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
    </LineChart>
  );
};

export default AllStoresEarningsChart;
