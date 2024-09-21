import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Criteria {
  field: string;
  operator: string;
  value: string;
}

interface AddFeeSchemeModalProps{
  fetchServiceFees: (companyId: string) => Promise<void>
}

const AddFeeSchemeModal: React.FC<AddFeeSchemeModalProps> = ({fetchServiceFees}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([
    { field: "", operator: "", value: "" },
  ]);
  const [rules, setRules] = useState<string[]>([""]);
  const [assetType, setAssetType] = useState("BTC"); // default value
  const [activity, setActivity] = useState("Transaction"); // default value
  const [gasPrice, setGasPrice] = useState(0); // default gas price
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(true); // default activity
  const searchParams = useSearchParams();

  const companyId = searchParams.get("companyId");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Add Criteria
  const addCriteria = () => {
    setCriteriaList([...criteriaList, { field: "", operator: "", value: "" }]);
  };

  // Remove Criteria, ensuring at least one remains
  const removeCriteria = (index: number) => {
    if (criteriaList.length > 1) {
      const newCriteria = criteriaList.filter((_, i) => i !== index);
      setCriteriaList(newCriteria);
    }
  };

  // Handle Criteria Change
  const handleCriteriaChange = (
    index: number,
    field: keyof Criteria,
    value: string
  ) => {
    const updatedCriteria = [...criteriaList];
    updatedCriteria[index][field] = value;
    setCriteriaList(updatedCriteria);
  };

  // Add Rule
  const addRule = () => {
    setRules([...rules, ""]);
  };

  // Remove Rule, ensuring at least one remains
  const removeRule = (index: number) => {
    if (rules.length > 1) {
      const newRules = rules.filter((_, i) => i !== index);
      setRules(newRules);
    }
  };

  // Handle Rule Change
  const handleRuleChange = (index: number, value: string) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    setRules(updatedRules);
  };

  const handleSubmit = async () => {
    const serviceFeeData = {
      assetType,
      gasPrice: parseFloat(gasPrice.toString()),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      activity: isActive,
      company: { id: Number(companyId) }, // Update: send company object with ID
      criteria: criteriaList, // Example of how criteria can be passed
      rules: rules.join(", "), // Combine rules if needed
    };
  
    try {
      const response = await fetch("http://localhost:4000/service-fee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceFeeData),
      });
  
      if (response.ok) {
        fetchServiceFees(companyId!)
        console.log("Service Fee created successfully!");
        handleClose(); // Close modal on success
      } else {
        console.error("Error creating Service Fee:", response.statusText);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };
  
  return (
    <div>
      {/* Add New Scheme Button */}
      <button
        onClick={handleOpen}
        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
      >
        Add new scheme
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg sm:max-w-5xl max-h-screen overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center bg-[background:#F8F8F9]">
              <h2 className="font-inter font-medium text-[20px] leading-[28px] text-[#14151A]">
                Add Fee Scheme
              </h2>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full border border-gray-300 text-gray-900 opacity-80 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center"
              >
                X
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Flex Layout: Asset Type, Activity, Fee */}
              <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Asset Type
                  </label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  >
                    <option>BTC</option>
                    <option>GAS</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Activity
                  </label>
                  <select
                    value={isActive ? "Active" : "Inactive"}
                    onChange={(e) =>
                      setIsActive(e.target.value === "Active" ? true : false)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  >
                    <option>Transaction</option>
                    <option>Transfer</option>
                    <option>Exchange</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Fee
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm">
                    <option>Select Fee</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              {/* Flex Layout: Start Time, End Time, Gas Price */}
              <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Gas Price
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm">
                    <option>Select Gas Price</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              {/* Criteria Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Criteria
                </label>
                {criteriaList.map((criteria, index) => (
                  <div
                    className="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0 items-center w-full"
                    key={index}
                  >
                    <input
                      type="text"
                      placeholder="Field"
                      className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm w-full lg:w-auto"
                      value={criteria.field}
                      onChange={(e) =>
                        handleCriteriaChange(index, "field", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Operator"
                      className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm w-full lg:w-auto"
                      value={criteria.operator}
                      onChange={(e) =>
                        handleCriteriaChange(index, "operator", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm w-full lg:w-auto"
                      value={criteria.value}
                      onChange={(e) =>
                        handleCriteriaChange(index, "value", e.target.value)
                      }
                    />
                    <button
                      className="w-[24px] h-[24px] p-[5px] rounded-lg bg-[#E6483D] text-white hover:bg-[#cc3c36] flex items-center justify-center"
                      onClick={() => removeCriteria(index)}
                      disabled={criteriaList.length === 1}
                    >
                      -
                    </button>

                    <button
                      className="w-[24px] h-[24px] p-[5px] rounded-lg bg-[#14151A] text-white hover:bg-[#14151A] flex items-center justify-center"
                      onClick={addCriteria}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>

              {/* Rules Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rules
                </label>
                {rules.map((rule, index) => (
                  <div
                    className="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0 items-center w-full"
                    key={index}
                  >
                    <select
                      className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm w-full lg:w-auto"
                      value={rule}
                      onChange={(e) => handleRuleChange(index, e.target.value)}
                    >
                      <option value="">Select Rule</option>
                      <option value="(A1 and A2)">A1 and A2</option>
                      <option value="A3">A3</option>
                      <option value="(A1 and A3)">A1 and A3</option>
                    </select>
                    <button
                      className="w-[24px] h-[24px] p-[5px] rounded-lg bg-[#E6483D] text-white hover:bg-[#cc3c36] flex items-center justify-center"
                      onClick={() => removeRule(index)}
                      disabled={rules.length === 1}
                    >
                      -
                    </button>
                    <button
                      className="w-[24px] h-[24px] p-[5px] rounded-lg bg-[#14151A] text-white hover:bg-[#14151A] flex items-center justify-center"
                      onClick={addRule}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end space-x-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFeeSchemeModal;
