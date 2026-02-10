import { useState, useEffect } from "react";
import { useCreating } from "@/context/Createboards";
import { Button } from "@/components/ui/button";
import Sheets from "@/components/common/Sheets";
import BoardCards from "@/components/cards/BoardCards";
import Paginations from "./components/common/Pagination";
import SkeletoneDynamic from "./components/common/SkeletoneCards";

const Boards = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { dispatch, getAllBoards, getBoardsLoading, mainBoard, pagination } =
    useCreating();

  useEffect(() => {
    getAllBoards();
  }, [pagination.current_page]);

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

      {getBoardsLoading ? (
        <SkeletoneDynamic
          className="w-full min-h-[5rem]"
          haveGrid={true}
          typeGrid={true}
        />
      ): mainBoard.length <= 0 ? (
          <p className="text-md text-gray-500">No Boards Yet</p>
        ) : (
        <BoardCards
          mainBoard={mainBoard}
          classname="w-full min-h-[40rem] flex flex-col gap-4"
        />
      )}
      <Paginations
        currentPage={pagination.current_page}
        totalPages={pagination.totalPages || 1}
        onPageChange={(current_page) =>
          dispatch({
            type: "GET_PAGINATIONS",
            payload: { ...pagination, current_page },
          })
        }
      />
    </div>
  );
};

export default Boards;
