import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreating } from "@/context/Createboards";
import SpinnerCircle2 from "../common/SpinnerLoading";
import { useParams } from "react-router-dom";

const TasksCreation = () => {
  const { id } = useParams();
  const {
    task_id,
    editTAsk,
    typeCreate,
    deletetask,
    submitTask,
    getForTasks,
    createTasks,
    sendLoading,
  } = useCreating();
  
  return (
    <div>
      <form className="flex flex-col gap-3">
        <div>
          <p className="mb-1 font-bold text-sm">Title</p>
          <Input
            value={createTasks.title}
            disabled={sendLoading}
            placeholder="Title"
            onChange={(e) => getForTasks("title", e.target.value)}
          />
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Subtitle</p>
          <Input
            value={createTasks.subtitle}
            disabled={sendLoading}
            placeholder="Subtitle"
            onChange={(e) => getForTasks("subtitle", e.target.value)}
          />
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Description</p>
          <textarea
            value={createTasks.description}
            disabled={sendLoading}
            placeholder="Description"
            onChange={(e) => getForTasks("description", e.target.value)}
            className="border w-full min-h-[6rem] p-2"
          />
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Status</p>
          <select
            onChange={(e) => getForTasks("status", e.target.value)}
            disabled={sendLoading}
            className="w-full border p-2 rounded cursor-pointer"
            value={createTasks.status}
          >
            <option value="ToDo">To Do</option>
            <option value="Inprogress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Assigned To</p>
          <Input
            value={createTasks.assignedTo}
            disabled={sendLoading}
            placeholder="Assigned to"
            onChange={(e) => getForTasks("assignedTo", e.target.value)}
          />
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Priority</p>
          <select
            onChange={(e) => getForTasks("priority", e.target.value)}
            disabled={sendLoading}
            value={createTasks.priority}
            className="w-full border p-3 rounded cursor-pointer"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">high</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Due Date</p>
          <Input
            type="date"
            value={createTasks.dueDate}
            disabled={sendLoading}
            onChange={(e) => getForTasks("dueDate", e.target.value)}
          />
        </div>

        {typeCreate === "tasks_edit" ? (
          <div className="flex justify-between gap-3">
            <Button
              onClick={(e) => editTAsk(e,Number(task_id))}
              className="flex-1 cursor-pointer"
            >
              Edit
            </Button>
            <Button 
            onClick={(e)=> deletetask(e,Number(task_id))}
            variant={"destructive"} className="flex-1 cursor-pointer">
              Delete
            </Button>
          </div>
        ) : (
          <Button
            onClick={(e) => submitTask(e, id as string)}
            disabled={sendLoading}
          >
            {sendLoading ? <SpinnerCircle2 /> : "Create Task"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default TasksCreation;
