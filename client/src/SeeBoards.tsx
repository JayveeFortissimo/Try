import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreating } from "@/context/Createboards";
import { useState, useEffect } from "react";
import Sheets from "@/components/common/Sheets";
import SkeletoneDynamic from "./components/common/SkeletoneCards";
import TaskCards from "./components/cards/TaskCards";
import SpinnerCircle2 from "./components/common/SpinnerLoading";
import { DateConverter } from "./lib/dateConverter";

const SeeBoards = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { dispatch, getAllBoardsByJoins, task } = useCreating();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    getAllBoardsByJoins(Number(id));
  }, []);

  const find = task.find((pro) => pro.board_id === Number(id));

  return (
    <div className="min-h-[40rem] container mx-auto p-4">
      <Sheets open={open} setOpen={setOpen} />
      <header className="mb-5">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft /> Back
        </Button>
      </header>

      {find?.length <= 0 || !find ? (
        <SkeletoneDynamic
          className="mb-5 min-h-[11rem] rounded p-5 flex flex-col justify-between"
          haveGrid={false}
        />
      ) : (
        <main
          style={{ backgroundColor: find?.color }}
          className="mb-5 min-h-[11rem] rounded p-5 flex flex-col justify-between"
        >
          <div>
            <p className="text-2xl font-bold">{find?.board_name}</p>
            <p>{find?.board_subtitle}</p>
          </div>

          <div>
            <p className="text-[0.7rem]">
              Created: {DateConverter(find?.board_created_at)}
            </p>
            <p className="text-[0.7rem]">
              Update: {DateConverter(find?.board_update_at)}
            </p>
          </div>
        </main>
      )}

      <section>
        <div className="border min-h-[3rem] flex justify-between items-center p-4 rounded">
          <div className="text-2xl font-bold w-full">
            Task <span>{!find ? <SpinnerCircle2 /> : find?.tasks.length}</span>
          </div>
          <Button
            onClick={() => {
              dispatch({ type: "SET_TYPE_CREATE", payload: "tasks" });
              setOpen((pro) => !pro);
            }}
          >
            Create Task
          </Button>
        </div>
      </section>

      <footer className={`grid grid-cols-1 gap-5 mt-10`}>
        {find?.tasks.map((pro: any) => (
          <div
            key={pro?.board_id}
            className="border min-h-[8rem] rounded hover:shadow-md cursor-pointer p-4"
              onClick={() => {
              dispatch({ type: "SET_TYPE_CREATE", payload: "tasks_edit" });
              setOpen((pro) => !pro);
            }}
          >
            <TaskCards
              taskName={pro?.task_name}
              taslSubtitle={pro?.task_subtitle}
              assigned={pro?.assigned_to}
              dueDate={pro?.due_date}
              task_created={pro?.task_created_at}
              status={pro?.task_status}
              priority={pro?.task_priority}
              update_at={pro?.task_update_at}
            />
          </div>
        ))}
      </footer>
    </div>
  );
};

export default SeeBoards;
