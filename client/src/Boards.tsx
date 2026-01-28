import { useState, useEffect } from "react";
import { useCreating } from "@/context/Createboards";
import { Button } from "@/components/ui/button";
import Sheets from "@/components/common/Sheets";
import BoardCards from "@/components/cards/boardCards";

const Boards = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { dispatch, getAllBoards, getBoardsLoading, mainBoard } = useCreating();

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <div className="min-h-[50rem] container mx-auto p-4">
      <Sheets open={open} setOpen={setOpen} />
      <header className="flex justify-between items-center mb-5">
        <p className="text-2xl font-bold">Boards</p>
        <Button
          onClick={() => {
            dispatch({ type: "SET_TYPE_CREATE", payload: "boards" });
            setOpen((pro) => !pro);
          }}
        >
          Create Board
        </Button>
      </header>

      <BoardCards mainBoard={mainBoard} getBoardsLoading={getBoardsLoading} classname="w-full min-h-[40rem] flex flex-col gap-4" />
    </div>
  );
};

export default Boards;
