import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useCreating } from "@/context/Createboards";

const Sheets = ({
  setOpen,
  open
}: {
  setOpen: (open:boolean) => void;
  open: boolean;
}) => {
  
  return (
     <div className="block lg:hidden">
          <div className="flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <p className="text-xl mb-2">Create New Board</p>
                   <p className="text-sm text-gray-500">Enter the details for your new board</p>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                 
                  <div className="flex flex-col gap-3">
                    <p>Contents</p>
                  </div>

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
  )
}

export default Sheets
