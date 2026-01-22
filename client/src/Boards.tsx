import { useState } from "react";
import { Button } from "./components/ui/button";
import Sheets from "@/components/common/Sheets";

const Boards = () => {
  const [open,setOpen] = useState<boolean>(false);
  
  return (
    <div className="min-h-[50rem] container mx-auto p-4">
       <Sheets
       open={open}
       setOpen={setOpen}
       />
       <header className="flex justify-between items-center">
        <p className="text-2xl font-bold">Boards</p>
        <Button onClick={()=> setOpen(pro => !pro)}>Create Board</Button>
       </header>


       <section>
         {/* waittt */}
       </section>
    </div>
  )
}

export default Boards
