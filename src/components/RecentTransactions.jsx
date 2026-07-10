import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { Car, Landmark, ShoppingBag, Utensils, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionTable from "./TransactionTable";

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
  const { transactions } = useContext(ExpenseContext);


  const latestTransactions = [...transactions].slice(0, 10);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recent Transactions</h2>

        <Link to='/transactions' className="text-blue-600 hover:text-blue-700">
          View All
        </Link>
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
              <th className="pb-4 font-medium">Type</th>

            </tr>
          </thead>

          <tbody>
            {latestTransactions.map((item) => (
              <tr key={item.id} className="border-b hover:bg-blue-50 transition duration-300">
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

                  className={`font-bold ${item.type === "income"

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

                {/* Type */}

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${item.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.type}
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