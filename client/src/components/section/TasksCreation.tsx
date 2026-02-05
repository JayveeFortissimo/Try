import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreating } from "@/context/Createboards";
import SpinnerCircle2 from "../common/SpinnerLoading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TasksCreation = () => {
  const { sendLoading, getForTasks, submitTask, createTasks, typeCreate } =
    useCreating();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(()=> {
      if(typeCreate === "tasks_edit") setIsEdit(true)
  },[typeCreate])

  return (
    <div>
      <form
        className="flex flex-col gap-3"
      >
        <div>
          <p className="mb-1 font-bold text-sm">Title</p>
          <Input
            value={createTasks.title}
            disabled={sendLoading || isEdit}
            placeholder="Title"
            onChange={(e) => getForTasks("title", e.target.value)}
          />
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Subtitle</p>
          <Input
            value={createTasks.subtitle}
            disabled={sendLoading ||isEdit}
            placeholder="Subtitle"
            onChange={(e) => getForTasks("subtitle", e.target.value)}
          />
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Description</p>
          <textarea
            value={createTasks.description}
            disabled={sendLoading || isEdit}
            placeholder="Description"
            onChange={(e) => getForTasks("description", e.target.value)}
            className="border w-full min-h-[6rem] p-2"
          />
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Status</p>
          <select
            onChange={(e) => getForTasks("status", e.target.value)}
            disabled={sendLoading || isEdit}
            className="w-full border p-2 rounded cursor-pointer"
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
            disabled={sendLoading || isEdit}
            placeholder="Assigned to"
            onChange={(e) => getForTasks("assignedTo", e.target.value)}
          />
        </div>

        <div>
          <p className="mb-1 font-bold text-sm">Priority</p>
          <select
            onChange={(e) => getForTasks("priority", e.target.value)}
            disabled={sendLoading || isEdit}
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
            disabled={sendLoading || isEdit}
            onChange={(e) => getForTasks("dueDate", e.target.value)}
          />
        </div>

        {typeCreate === "tasks_edit" ? (
           <div className="flex justify-between gap-3">
            <Button className="flex-1 cursor-pointer">Edit</Button>
            <Button variant={"destructive"} className="flex-1 cursor-pointer">Delete</Button>
           </div>
        ) : (
          <Button  onClick={(e) => submitTask(e, id as string)} disabled={sendLoading}>
            {sendLoading ? <SpinnerCircle2 /> : "Create Task"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default TasksCreation;
