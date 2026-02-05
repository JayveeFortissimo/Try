import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { btns } from "@/lib/dashboardsUtils";
import BoardCards from "@/components/cards/BoardCards";
import { useCreating } from "@/context/Createboards";
import Paginations from "@/components/common/Pagination";
import SkeletoneDynamic from "./components/common/SkeletoneCards";

const Dashboard = () => {
  const { getBoardsLoading, mainBoard, getAllBoards, pagination, dispatch } =
    useCreating();

  useEffect(() => {
    getAllBoards();
  }, [pagination.current_page]);

  const allMetrics: { name: string; countData: number; emoji: string }[] = [
    {
      name: "Total Tasks",
      countData: 3,
      emoji: "📊",
    },
    {
      name: "To Do",
      countData: 4,
      emoji: "⭕",
    },
    {
      name: "In Progress",
      countData: 2,
      emoji: "⏳",
    },
    {
      name: "Completed",
      countData: 5,
      emoji: "✅",
    },
    {
      name: "Completion Rate",
      countData: 6,
      emoji: "📈",
    },
  ];

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
          {allMetrics.map((metrics, index) => (
            <div
              key={index}
              className="border min-h-[8rem] p-5 rounded flex gap-5 items-center hover:shadow-md"
            >
              <div className="flex flex-col gap-3 w-full">
                <p className="text-md text-gray-500 font-medium">
                  {metrics.name}
                </p>
                <p className="text-3xl font-bold">{metrics.countData}</p>
              </div>
              <div>
                <p className="text-4xl">{metrics.emoji}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="min-h-[20rem] w-full mb-10">
        <p className="mb-5 text-2xl font-bold">All Boards</p>

        {getBoardsLoading ? (
          <SkeletoneDynamic className="w-full min-h-[5rem]" haveGrid={true}/>
        ) : (
          <BoardCards
            mainBoard={mainBoard}
            classname="w-full min-h-[10rem] grid grid-cols-1 md:grid-cols-2 gap-4"
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
      </footer>
    </div>
  );
};

export default Dashboard;
