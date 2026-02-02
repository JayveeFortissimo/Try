import SpinnerCircle2 from "@/components/common/SpinnerLoading";
import type { GetBoards } from "@/interface/Creations.interface";
import { useNavigate } from "react-router-dom";

const BoardCards = ({
    mainBoard,
    getBoardsLoading,
    classname
}: {
  mainBoard: GetBoards[];
  getBoardsLoading: boolean;
  classname?: string;
}) => {
  const redirect = useNavigate();
  return (
    <section className={classname}>
      {getBoardsLoading ? (
        <div className="w-full min-h-[40rem] grid place-items-center">
          <SpinnerCircle2 />{" "}
        </div>
      ) : mainBoard.length <= 0 ? (
        <p className="text-center">No Boards Yet</p>
      ) : (
        mainBoard.map((board) => (
          <div
            key={board.board_id}
            style={{ backgroundColor: board.color }}
            className={`border min-h-[8rem] rounded hover:shadow-md cursor-pointer p-4`}
            onClick={() => redirect(`/boards/${board.board_id}`)}
          >
            <p className="text-lg font-bold mb-2">{board.board_name}</p>
            <p className="text-sm text-gray-500">{board.board_subtitle}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default BoardCards;
