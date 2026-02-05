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
    color: "#F59E0B",
    subtitle:""
  },
  createTasks: {
    title: "",
    subtitle:"",
    description: "",
    status: "ToDo",
    assignedTo: "",
    priority: "low",
    dueDate: new Date(""),
  },
  typeCreate: "",
  setTypeCreate: () => {},
  mainBoard:[],
  task:[],
  dispatch: () => {},
  sendLoading:false,
  getBoardsLoading:true,
  getAllbyJoins:true,
  submitBoards: async(_e:React.FormEvent<HTMLFormElement>)=>{},
  submitTask: async(_e:React.MouseEvent<HTMLButtonElement>, _id:string)=>{},
  getAllBoards: async()=>{},
  getAllBoardsByJoins:async(_id:number) => {},
    pagination:{
    current_page:1,
    itemsPerPage:0,
    totalPages:0
  }
});

const reducer = (state: InitialStateInterface , action: { type: string; payload: any}) => {
     switch(action.type) {
        case "SET_CREATE_BOARDS": return {...state, createBoards:action.payload};
        case "SET_CREATE_TASKS": return {...state, createTasks:action.payload};
        case "SET_TYPE_CREATE": return {...state, typeCreate:action.payload};
        case "SET_SEND_LOADING": return {...state, sendLoading:action.payload}
        case "SET_GET_BOARDS_LOADING": return {...state, getBoardsLoading:action.payload}
        case "SET_GET_BYJOINS_LOADING": return {...state, getAllbyJoins:action.payload}
        case "SET_MAIN_BOARD": return {...state, mainBoard:action.payload}
        case "GET_JOINS_DATA": return {...state, task:[action.payload]}
        case "GET_PAGINATIONS": return {...state, pagination:action.payload}
        default: return state;
     }
};

const initialState: InitialStateInterface = {
  sendLoading:false,
  getBoardsLoading:true,
  getAllbyJoins:true,
  createBoards: {
    name: "",
    description: "",
    color: "#F59E0B",
    subtitle:""
  },
  createTasks: {
    title: "",
    subtitle:"",
    description: "",
    status: "ToDo",
    assignedTo: "",
    priority: "low",
    dueDate: new Date(""),
  },
  typeCreate: "",
  mainBoard:[],
  task:[],
  pagination:{
    current_page:1,
    itemsPerPage:4,
    totalPages:0
  }
};

const Createboards = ({ children }: { children: React.ReactNode }) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  const getForBoards = (type: string, value: string) =>  dispatch({type: "SET_CREATE_BOARDS", payload: {...data.createBoards, [type]: value}});

  const getForTasks = (type: string, value: string) => dispatch({type: "SET_CREATE_TASKS", payload: {...data.createTasks, [type]: value}});

  const setTypeCreate = (type: string) => dispatch({type: "SET_TYPE_CREATE", payload: type});


  const getAllBoards = async() => {
    try{ 
      dispatch({type:"SET_GET_BOARDS_LOADING", payload:true});
      const getBoards = await api.get(`/api/boards?page=${data.pagination.current_page}&limit=${data.pagination.itemsPerPage}`);
      if(getBoards.status !== 200) return console.log("Cannot fetch");
      
      dispatch({type:"SET_MAIN_BOARD", payload:getBoards.data.boardData});
      dispatch({type:"GET_PAGINATIONS", payload:getBoards.data.pagination })

      console.log("AllData :", getBoards.data.boardData)
    }catch(error){
      console.log(error)
      dispatch({type:"SET_GET_BOARDS_LOADING", payload:false});
    }finally{
      dispatch({type:"SET_GET_BOARDS_LOADING", payload:false});
    }
  }

 const getAllBoardsByJoins = async(id:number) => {
    try{ 
        dispatch({type:"SET_GET_BYJOINS_LOADING", payload:true})
        const response = await api.get(`/api/getAllBoards/${id}`);
        if(response.status !== 200) return console.log("Cannot Fetch");
        console.log(response.data.data)
        dispatch({type:"GET_JOINS_DATA", payload:response.data.data});
    }catch(error){
      console.log(error)
      dispatch({type:"SET_GET_BYJOINS_LOADING", payload:false})
    }finally{
      dispatch({type:"SET_GET_BYJOINS_LOADING", payload:false})
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


    const submitTask= async(e:React.MouseEvent<HTMLButtonElement>, id:string) => {
         e.preventDefault();
        dispatch({type:"SET_SEND_LOADING", payload:true});
       try{
          const insertTasks = await api.post("/api/postTask", {
           task_name: data.createTasks.title,
           task_description: data.createTasks.description,
           task_subtitle: data.createTasks.subtitle,
           task_status: data.createTasks.status,
           assigned_to: data.createTasks.assignedTo,
           task_priority: data.createTasks.priority,
           due_date: data.createTasks.dueDate,
            board_id: Number(id) 
          });
          if(insertTasks.status === 200) return console.log(insertTasks.data);
           console.log("OK NA!")
       }catch(error){
         dispatch({type:"SET_SEND_LOADING", payload:false});
         console.log(error)
       }finally{
       dispatch({type:"SET_SEND_LOADING", payload:false});
       // wait for it
       dispatch({type:"SET_CREATE_TASKS", payload: {...data.createTasks,  title: "", subtitle:"", description: "", status: "To Do", assignedTo: "", priority: "low", dueDate: new Date("")}});
      }
   }

  const { typeCreate, mainBoard, task, createBoards , createTasks, sendLoading, getBoardsLoading, getAllbyJoins, pagination} = data;

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
        getBoardsLoading,
        submitTask,
        getAllBoardsByJoins,
        getAllbyJoins,
        pagination
      }}
    >
      {children}
    </contextProvider.Provider>
  );
};

export default Createboards;

export const useCreating = () => useContext(contextProvider);
