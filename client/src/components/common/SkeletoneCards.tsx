import { Skeleton } from "@/components/ui/skeleton";

const SkeletoneDynamic = ({
  className,
  haveGrid,
  typeGrid,
}: {
  className: string;
  haveGrid?: boolean;
  typeGrid?:boolean
}) => {
  return (
    <div className={`${haveGrid && `grid grid-cols-1 ${typeGrid?"md:grid-cols-1":"md:grid-cols-2"} gap-5`} min-h-[10rem]`}>
      {!haveGrid && <Skeleton className={className} />}
      {haveGrid && Array.from({ length: 4 }).map((_, index) => {
        return <Skeleton key={index} className="min-h-[8rem] w-full" />;
      })}
    </div>
  );
};

export default SkeletoneDynamic;
