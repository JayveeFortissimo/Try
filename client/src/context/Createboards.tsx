import { createContext, useContext, useReducer } from "react";
import type {
  ContextAPI,
  InitialStateInterface
} from "@/interface/Creations.interface";
import api from "@/lib/api";

const contextProvider = createContext<ContextAPI>({
  getForBoards: () => {},
  getForTasks: () => {},
  createBoards: {
    name: "",
    description: "",
    color: "",
    subtitle:""
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
  task:[],
  dispatch: () => {},
  sendLoading:false,
  getBoardsLoading:true,
  submitBoards: async(_e:React.FormEvent<HTMLFormElement>)=>{},
  getAllBoards: async()=>{}
});

const reducer = (state: InitialStateInterface , action: { type: string; payload: any}) => {
     switch(action.type) {
        case "SET_CREATE_BOARDS": return {...state, createBoards:action.payload};
        case "SET_CREATE_TASKS": return {...state, createTasks:action.payload};
        case "SET_TYPE_CREATE": return {...state, typeCreate:action.payload};
        case "SET_SEND_LOADING": return {...state, sendLoading:action.payload}
        case "SET_GET_BOARDS_LOADING": return {...state, getBoardsLoading:action.payload}
        case "SET_MAIN_BOARD": return {...state, mainBoard:action.payload}
        default: return state;
     }
};

const initialState: InitialStateInterface = {
  sendLoading:false,
  getBoardsLoading:true,
  createBoards: {
    name: "",
    description: "",
    color: "",
    subtitle:""
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


  const getAllBoards = async() => {
    try{ 
      dispatch({type:"SET_GET_BOARDS_LOADING", payload:true});
      const getBoards = await api.get("/api/boards");
      if(getBoards.status !== 200) return console.log("Cannot fetch");
      dispatch({type:"SET_MAIN_BOARD", payload:getBoards.data.boardData});
      console.log("SUCCESS! ")
    }catch(error){
      console.log(error)
      dispatch({type:"SET_GET_BOARDS_LOADING", payload:false});
    }finally{
      dispatch({type:"SET_GET_BOARDS_LOADING", payload:false});
    }
  }

   const submitBoards = async(e:React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
        dispatch({type:"SET_SEND_LOADING", payload:true});
       try{
          const insertBoards = await api.post("/api/postBoards", {
            board_name: data.createBoards.name,
            board_description: data.createBoards.description,
            board_subtitle: data.createBoards.subtitle,
            color: data.createBoards.color,
            updated_at: new Date().toISOString()
          });
          if(insertBoards.status === 200) return console.log(insertBoards.data);
           console.log("OK NA!")
       }catch(error){
         dispatch({type:"SET_SEND_LOADING", payload:false});
         console.log(error)
       }finally{
       dispatch({type:"SET_SEND_LOADING", payload:false});
       // wait for it
       dispatch({type:"SET_CREATE_BOARDS", payload: {...data.createBoards, name:"", description:"", subtitle:"", color:""}});
       }
   }


  const { typeCreate, mainBoard, task, createBoards , createTasks, sendLoading, getBoardsLoading} = data;

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
        task,
        dispatch,
        sendLoading,
        submitBoards,
        getAllBoards,
        getBoardsLoading
      }}
    >
      {children}
    </contextProvider.Provider>
  );
};

export default Createboards;

export const useCreating = () => useContext(contextProvider);
