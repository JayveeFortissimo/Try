import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export default function Paginations({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (current_page: number) => void;
}) {
  return (
    <div className="w-full max-w-xs mt-10">
      <Pagination className="w-full">
        <PaginationContent className="w-full justify-between">
          <PaginationItem
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-50",
            )}
          >
            <PaginationPrevious className="border" href="#" />
          </PaginationItem>

          <PaginationItem>
            <span className="text-muted-foreground text-sm">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={cn(
              currentPage === totalPages && "pointer-events-none opacity-50",
            )}
          >
            <PaginationNext className="border" href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
