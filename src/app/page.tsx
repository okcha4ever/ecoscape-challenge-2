"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import AllStoresEarningsChart from "./comps/AllStoresEarningsChart";
import StoreEarningsChart from "./comps/StoreEarningsChart";

const WalmartSales = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch("/Walmart_sales.csv")
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (results: { data: React.SetStateAction<never[]> }) => {
            setSalesData(results.data);
          },
        });
      });
  }, []);

  console.log(salesData);
  const preprocessSalesData = (salesData) => {
    // Convert date and calculate monthly sales
    const monthlySales = salesData.reduce((acc, curr) => {
      const date = new Date(curr.Date);
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const key = `${curr.Store}-${yearMonth}`;

      if (!acc[key]) {
        acc[key] = {
          store: curr.Store,
          date: yearMonth,
          earnings: 0,
        };
      }

      acc[key].earnings += parseFloat(curr.Weekly_Sales);

      return acc;
    }, {});

    return Object.values(monthlySales);
  };

  return (
    <div>
      <AllStoresEarningsChart salesData={salesData} />
      <hr />
      <StoreEarningsChart salesData={salesData} />
      {/* <h1>Walmart Sales Data</h1>
      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Date</th>
            <th>Weekly Sales</th>
            {/* Add more headers based on your CSV structure */}
    </div>
  );
};

export default WalmartSales;
