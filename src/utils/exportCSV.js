import Papa from "papaparse";
import { saveAs } from "file-saver";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const exportCSV = (transactions) => {
  if (!transactions.length) {
    alert("No transactions available to export.");
    return;
  }

  const { addNotification } = useContext(NotificationContext);

  const csvData = transactions.map((item) => ({
    Title: item.title,
    Category: item.category,
    Type: item.type,
    Amount: item.amount,
    "Payment Method": item.paymentMethod,
    Date: item.date
      ? new Date(item.date).toLocaleDateString("en-IN")
      : "N/A",
    Notes: item.notes || "",
  }));

  const csv = Papa.unparse(csvData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const fileName = `Expense_Report_${new Date().toISOString().split("T")[0]
    }.csv`;

  saveAs(blob, fileName);

  addNotification({
    title: "CSV Exported",
    message: "Transactions exported successfully.",
    type: "report",
  });

};

export default exportCSV;