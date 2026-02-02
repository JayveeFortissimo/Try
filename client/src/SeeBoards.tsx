import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreating } from "@/context/Createboards";
import { useState, useEffect } from "react";
import Sheets from "@/components/common/Sheets";

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
           Created: {new Date(find?.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-[0.7rem]">
            Update: {new Date(find?.update_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </main>

      <section>
        <div className="border min-h-[3rem] flex justify-between items-center p-4 rounded">
          <p className="text-2xl font-bold">Task ({find?.tasks.length})</p>
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
            key={pro.board_id}
            className="border min-h-[8rem] rounded hover:shadow-md cursor-pointer p-4"
          >
            <header className="flex flex-col gap-2 mb-3">
              <p className="text-lg font-bold">{pro?.task_name}</p>
              <p className="text-sm text-gray-500">{pro?.task_subtitle}</p>
            </header>

            <section className="grid grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-sm font-semibold">Assigned to:</p>
                <p className="text-[0.7rem] font-semibold text-gray-500">
                  {pro?.assigned_to}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">Due date:</p>
                <p className="text-[0.7rem] font-semibold text-gray-500">
                  {pro?.due_date}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">Created:</p>
                <p></p>
              </div>

              <div>
                <p className="text-sm font-semibold">Upadated:</p>
                <p></p>
              </div>
            </section>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default SeeBoards;
