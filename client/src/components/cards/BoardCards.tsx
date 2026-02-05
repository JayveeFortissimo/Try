import type { GetBoards } from "@/interface/Creations.interface";
import { useNavigate } from "react-router-dom";

const BoardCards = ({
    mainBoard,
    classname
}: {
  mainBoard: GetBoards[];
  classname?: string;
}) => {
  const redirect = useNavigate();
  return (
    <section className={classname}>
      {
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
      }
    </section>
  );
};

export default BoardCards;
