"use client";
import React from "react";
import FeeSchemeTable from "./FeeSchemeTable";
import CompanyActionBanner from "../CompanyActionBanner";
import NavigationTabs from "../NavigationTabs";

const FeeService: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <CompanyActionBanner />
      <NavigationTabs />
      <FeeSchemeTable />
    </div>
  );
};

export default FeeService;
