import api from "./api";

export const exportAsJSON = async () => {
  try {
    const response = await api.get("api/exportedJSON");

    if (response.status === 200) {
      const jsonString = JSON.stringify(
        { allExportedData: response.data.allExportedData },
        null,
        2,
      );

      const blob = new Blob([jsonString], { type: "application/json" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `export-${new Date().toISOString()}.json`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (_error) {
  } finally {
    console.log("DONEEEEEEEEEE THANKS FOR IMPORT");
  }
};



export const exportCombinedCSV = async() => {
 try{
   const response = await api.get("api/exportedJSON");
 
  if(response.status === 200){
     const metrics = response.data.allExportedData.Metrics?.[0] || {};
  const boards = response.data.allExportedData.Boards || [];

  const headers = [
    // Metrics
    "total_tasks",
    "todo",
    "inprogress",
    "done",

    // Board
    "board_id",
    "board_name",
    "board_subtitle",
    "color",

    // Task
    "task_id",
    "task_name",
    "task_status",
    "assigned_to",
    "task_priority",
    "due_date",
  ];

  const rows = boards.map((board:any) => {
    return headers.map(header => {
      // If header exists in metrics, use it
      if (metrics[header] !== undefined) {
        return `"${metrics[header]}"`;
      }

      // Otherwise, use board/task data
      return `"${board[header] ?? ""}"`;
    }).join(",");
  });

  const csvContent = [
    headers.join(","),
    ...rows
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `export-combined-${new Date().toISOString()}.csv`;
  link.click();

  URL.revokeObjectURL(url);
  }
 }catch(_error){}
 finally{console.log("HELLOOOOOO")}
};


