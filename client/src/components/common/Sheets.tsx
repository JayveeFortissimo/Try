import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BoardsCreation from "@/components/section/BoardsCreation";
import { useCreating } from "@/context/Createboards";
import TasksCreation from "@/components/section/TasksCreation";

const Sheets = ({
  setOpen,
  open,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
}) => {
  const { typeCreate } = useCreating();
  console.log(typeCreate)
  return (
    <div className="block lg:hidden">
      <div className="flex items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <p className="text-xl mb-2">Create New {typeCreate === "boards" ? "Board" : "Task"}</p>
                <p className="text-sm text-gray-500">
                  Enter the details for your new {typeCreate === "boards" ? "board" : "task"}
                </p>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 p-4">
              {typeCreate === "boards" ? <BoardsCreation /> : <TasksCreation />}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Sheets;
