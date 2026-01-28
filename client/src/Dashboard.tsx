import { Button } from "@/components/ui/button";
import { btns } from "@/lib/dashboardsUtils";
import BoardCards from "@/components/cards/boardCards";
import { useCreating } from "@/context/Createboards";
import { useEffect } from "react";

const Dashboard = () => {
  const { getBoardsLoading, mainBoard, getAllBoards } = useCreating();

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <div className="min-h-[50rem] container mx-auto p-4">
      <header className="flex justify-between items-center mb-15">
        <h1 className="text-2xl font-bold">Dashboard Page</h1>
        <div className="flex gap-5">
          {btns.map((btn, index) => (
            <Button key={index} variant={"outline"}>
              {btn.name}
            </Button>
          ))}
        </div>
      </header>

      <section className="mb-5">
        <p className="mb-5 text-2xl font-bold">Analytics</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((metrics, index) => (
            <div key={index} className="border min-h-[10rem] p-5 rounded"></div>
          ))}
        </div>
      </section>

      <footer className="min-h-[20rem] w-full mb-10">
        <p className="mb-5 text-2xl font-bold">All Boards</p>
        <BoardCards mainBoard={mainBoard} getBoardsLoading={getBoardsLoading} classname="w-full min-h-[20rem] grid grid-cols-1 md:grid-cols-2 gap-4"/>
      </footer>
    </div>
  );
};

export default Dashboard;
