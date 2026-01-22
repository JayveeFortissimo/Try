import { createContext, useContext, useReducer } from "react";
import type {
  ContextAPI,
  InitialStateInterface
} from "@/interface/Creations.interface";

const contextProvider = createContext<ContextAPI>({
  getForBoards: () => {},
  getForTasks: () => {},
  createBoards: {
    name: "",
    description: "",
    color: "",
  },
  createTasks: {
    title: "",
    description: "",
    status: "",
    assignedTo: "",
    priority: "",
    dueDate: "",
  },
  typeCreate: "",
  setTypeCreate: () => {},
  mainBoard:[],
  task:[]
});

const reducer = (state: InitialStateInterface , action: { type: string; payload: any}) => {
     switch(action.type) {
        case "SET_CREATE_BOARDS": return {...state, createBoards:action.payload};
        case "SET_CREATE_TASKS": return {...state, createTasks:action.payload};
        case "SET_TYPE_CREATE": return {...state, typeCreate:action.payload};
        default: return state;
     }
};

const initialState: InitialStateInterface = {
  createBoards: {
    name: "",
    description: "",
    color: "",
  },
  createTasks: {
    title: "",
    description: "",
    status: "",
    assignedTo: "",
    priority: "",
    dueDate: "",
  },
  typeCreate: "",
  mainBoard:[],
  task:[]
};

const Createboards = ({ children }: { children: React.ReactNode }) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  const getForBoards = (type: string, value: string) =>  dispatch({type: "SET_CREATE_BOARDS", payload: {...data.createBoards, [type]: value}});

  const getForTasks = (type: string, value: string) => dispatch({type: "SET_CREATE_TASKS", payload: {...data.createTasks, [type]: value}});

   const setTypeCreate = (type: string) => dispatch({type: "SET_TYPE_CREATE", payload: type});

  const { typeCreate, mainBoard, task, createBoards , createTasks} = data;

  return (
    <contextProvider.Provider
      value={{
        getForBoards,
        getForTasks,
        createBoards,
        createTasks,
        typeCreate,
        setTypeCreate,
        mainBoard,
        task
      }}
    >
      {children}
    </contextProvider.Provider>
  );
};

export default Createboards;

export const useCreating = () => useContext(contextProvider);
