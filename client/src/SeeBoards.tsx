import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useCreating } from "@/context/Createboards";
import { useState } from "react";
import Sheets from "@/components/common/Sheets";

const SeeBoards = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {dispatch} = useCreating();

  const [open, setOpen] = useState<boolean>(false);
  console.log(id);

  return (
    <div className="min-h-[40rem] container mx-auto p-4">
        <Sheets open={open} setOpen={setOpen} />
      <header className="mb-5">
        <Button
        onClick={()=>navigate(-1)}
        >
          <ArrowLeft /> Back
        </Button>
      </header>


      <main className="mb-5 border min-h-[13rem] rounded">

      </main>


      <section>
        <div className="border min-h-[3rem] flex justify-between items-center p-4 rounded">
            <p className="text-2xl font-bold">Task</p>
            <Button
            onClick={()=> {
                dispatch({ type: "SET_TYPE_CREATE", payload: "tasks" });
                setOpen((pro) => !pro);
            }}
            >Create Task</Button>
        </div>
      </section>
      
    </div>
  );
};

export default SeeBoards;
