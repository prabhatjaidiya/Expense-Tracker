import {
  ShoppingBag,
  Utensils,
  Car,
  Wallet,
  Landmark,
} from "lucide-react";

import transactions from "../data/transactions";

const getCategoryIcon = (category) => {
  switch (category) {
    case "Shopping":
      return <ShoppingBag size={18} className="text-pink-500" />;

    case "Food":
      return <Utensils size={18} className="text-orange-500" />;

    case "Transport":
      return <Car size={18} className="text-blue-500" />;

    case "Salary":
      return <Wallet size={18} className="text-green-600" />;

    default:
      return <Landmark size={18} className="text-gray-500" />;
  }
};

const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          All Transactions
        </h2>

      
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-gray-500 text-sm border-b">

              <th className="pb-4 font-medium">Title</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Amount</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Method</th>

            </tr>

          </thead>

          <tbody>

            {transactions.reverse().map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-blue-50 transition duration-300"
              >

                {/* Title */}

                <td className="py-4 font-semibold text-gray-700">
                  {item.title}
                </td>

                {/* Category */}

                <td>

                  <div className="flex items-center gap-2">

                    {getCategoryIcon(item.category)}

                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>

                  </div>

                </td>

                {/* Amount */}

                <td
                  className={`font-bold ${
                    item.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}₹
                  {item.amount.toLocaleString()}
                </td>

                {/* Date */}

                <td className="text-gray-500">
                  {item.date}
                </td>

                {/* Payment */}

                <td>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    {item.paymentMethod}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentTransactions;