import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import ExpenseContext from "../context/ExpenseContext";

const AddExpense = () => {
  const navigate = useNavigate();
  const { addTransaction } = useContext(ExpenseContext);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "Expense",
    paymentMethod: "",
    date: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newTransaction = {
      id: uuid(),
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type.toLowerCase(),
      paymentMethod: formData.paymentMethod,
      date: formData.date,
      notes: formData.notes,
    };

    addTransaction(newTransaction);

    setFormData({
      title: "",
      amount: "",
      category: "",
      type: "Expense",
      paymentMethod: "",
      date: "",
      notes: "",
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Add Transaction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-2 font-medium">Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block mb-2 font-medium">Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Category</option>
                <option>Food</option>
                <option>Shopping</option>
                <option>Transport</option>
                <option>Bills</option>
                <option>Salary</option>
                <option>Entertainment</option>
                <option>Health</option>
                <option>Education</option>
                <option>Investment</option>
                <option>Other</option>
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block mb-2 font-medium">Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>Expense</option>
                <option>Income</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Payment */}
            <div>
              <label className="block mb-2 font-medium">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Method</option>
                <option>Cash</option>
                <option>UPI</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Bank Transfer</option>
                <option>Wallet</option>
              </select>

              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 font-medium">Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-2 font-medium">
              Notes (Optional)
            </label>

            <textarea
              rows="4"
              name="notes"
              placeholder="Write something..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;