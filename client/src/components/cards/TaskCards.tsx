import { DateConverter } from "@/lib/dateConverter";
import { Badge } from "@/components/ui/badge";
const TaskCards = ({
  taskName,
  taslSubtitle,
  assigned,
  dueDate,
  task_created,
  status,
  priority,
  update_at,
}: {
  taskName: string;
  taslSubtitle: string;
  assigned: string;
  dueDate: string;
  task_created: string;
  status: string;
  priority: string;
  update_at: string;
}) => {
  const styleStatusConfig: Record<string, string> = {
    ToDo: "bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full",
    Inprogress:
      "bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full",
    Done: "bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 shadow-none rounded-full",
  };

  const stylePriorityConfig: Record<string, string> = {
    high: "bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full",
    medium:
      "bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full",
    low: "bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 shadow-none rounded-full",
  };

  return (
    <div>
      <header className="flex justify-between gap-2 mb-3">
        <div>
          <p className="text-lg font-bold">{taskName}</p>
          <p className="text-sm text-gray-500">{taslSubtitle}</p>
        </div>
        <div className="flex gap-5 text-[0.8rem]">
          <Badge className={styleStatusConfig[status]}>
            <div
              className={`h-1.5 w-1.5 rounded-full mr-2 ${
                status === "Inprogress"
                  ? "bg-amber-600"
                  : status === "Done"
                    ? "bg-emerald-600"
                    : "bg-red-600"
              }`}
            />
            {status.toUpperCase()}
          </Badge>

          <Badge className={stylePriorityConfig[priority]}>
            <div
              className={`h-1.5 w-1.5 rounded-full mr-2 ${
                priority === "medium"
                  ? "bg-amber-600"
                  : priority === "low"
                    ? "bg-emerald-600"
                    : "bg-red-600"
              }`}
            />
            {priority.toUpperCase()}
          </Badge>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4">
        <div>
          <p className="text-sm font-semibold">Assigned to:</p>
          <p className="text-[0.7rem] font-semibold text-gray-500">
            {assigned}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Created:</p>
          <p className="text-[0.7rem] font-semibold text-gray-500">
            {DateConverter(task_created)}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Due date:</p>
          <p className="text-[0.7rem] font-semibold text-gray-500">
            {DateConverter(dueDate)}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Upadated:</p>
          <p className="text-[0.7rem] font-semibold text-gray-500">
            {DateConverter(update_at)}
          </p>
        </div>
      </section>
    </div>
  );
};

export default TaskCards;
