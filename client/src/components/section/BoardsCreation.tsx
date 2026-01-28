import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreating } from "@/context/Createboards";
import SpinnerCircle2 from "../common/SpinnerLoading";

const BoardsCreation = () => {
    const  {submitBoards, sendLoading, getForBoards, createBoards} = useCreating();
    console.log(createBoards)
  return (
    <form onSubmit={submitBoards} className="flex flex-col gap-3">
      <div>
        <p className="mb-1 font-bold text-sm">Title</p>
        <Input disabled={sendLoading} placeholder="Title" onChange={e => getForBoards("name", e.target.value)}/>
      </div>

      <div>
        <p className="mb-1 font-bold text-sm">Subtitle</p>
        <Input disabled={sendLoading} placeholder="Subtitle" onChange={e => getForBoards("subtitle", e.target.value)} />
      </div>

      <div>
        <p className="mb-1 font-bold text-sm">Description</p>
        <textarea disabled={sendLoading} placeholder="Description" onChange={e => getForBoards("description", e.target.value)} className="border w-full min-h-[6rem] p-2" />
      </div>

      <div>
        <p className="mb-1 font-bold text-sm">Colors</p>
        <select onChange={e => getForBoards("color", e.target.value)} disabled={sendLoading} className="w-full border p-3 rounded cursor-pointer">
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
        </select>
      </div>
      <Button 
      disabled={sendLoading}
      type="submit">{sendLoading? <SpinnerCircle2/>: "Create Board"}</Button>
    </form>
  );
};

export default BoardsCreation;
