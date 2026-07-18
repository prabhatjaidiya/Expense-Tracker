import Papa from "papaparse";
import { saveAs } from "file-saver";

const exportCSV = (transactions) => {
  if (!transactions.length) {
    alert("No transactions available to export.");
    return;
  }

  const csvData = transactions.map((item) => ({
    Title: item.title,
    Category: item.category,
    Type: item.type,
    Amount: item.amount,
    "Payment Method": item.paymentMethod,
    Date: new Date(item.date).toLocaleDateString(),
    Notes: item.notes || "",
  }));

  const csv = Papa.unparse(csvData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });
  
  const fileName = `Expense_Report_${new Date().toISOString().split("T")[0]
    }.csv`;

  saveAs(blob, fileName);

};

export default exportCSV;