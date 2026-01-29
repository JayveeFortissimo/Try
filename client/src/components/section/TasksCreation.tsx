import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreating } from "@/context/Createboards";
import SpinnerCircle2 from "../common/SpinnerLoading";
import { useParams } from "react-router-dom";

const TasksCreation = () => {
     const  {sendLoading, getForTasks, submitTask } = useCreating();
     const { id } = useParams();
      console.log("ID: ",id);
  return (
    <div>
    <form onSubmit={(e) => submitTask(e, id as string)} className="flex flex-col gap-3">
      <div>
        <p className="mb-1 font-bold text-sm">Title</p>
        <Input disabled={sendLoading} placeholder="Title" onChange={e => getForTasks("title", e.target.value)}/>
      </div>

      <div>
        <p className="mb-1 font-bold text-sm">Subtitle</p>
        <Input disabled={sendLoading} placeholder="Subtitle"  onChange={e => getForTasks("subtitle", e.target.value)} />
      </div>

      <div>
        <p className="mb-1 font-bold text-sm">Description</p>
        <textarea disabled={sendLoading} placeholder="Description" onChange={e => getForTasks("description", e.target.value)} className="border w-full min-h-[6rem] p-2" />
      </div>

      <div>
        <p className="mb-1 font-bold text-sm">Status</p>
        <select onChange={e => getForTasks("status", e.target.value)} disabled={sendLoading} className="w-full border p-2 rounded cursor-pointer">
          <option value="To Do">To Do</option>
          <option value="In progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

        <div>
        <p className="mb-1 font-bold text-sm">Assigned To</p>
        <Input disabled={sendLoading} placeholder="Assigned to"  onChange={e => getForTasks("assignedTo", e.target.value)} />
      </div>


        <div>
        <p className="mb-1 font-bold text-sm">Priority</p>
        <select onChange={e => getForTasks("priority", e.target.value)} disabled={sendLoading} className="w-full border p-3 rounded cursor-pointer">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">high</option>
        </select>
      </div>


       <div>
        <p className="mb-1 font-bold text-sm">Due Date</p>
        <Input type="date" disabled={sendLoading}  onChange={e => getForTasks("dueDate", e.target.value)} />
      </div>

      <Button 
      disabled={sendLoading}
      type="submit">{sendLoading? <SpinnerCircle2/>: "Create Task"}</Button>
    </form>
    </div>
  )
}

export default TasksCreation
