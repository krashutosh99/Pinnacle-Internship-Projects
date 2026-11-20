import { useState } from "react";
import { ChevronDown, ChevronUp, SquarePen, Trash2, Check, CircleX } from "lucide-react";
import CheckBox from "./CheckBox";

const TodoItem = ({item, onTodoToggle, onTodoDelete, onTodoTextUpdate, onTodoMoveUp, onTodoMoveDown, index, todosLength}) => {

  const [showEditTodo, setShowEditTodo] = useState(false);
  
  // [1.] Function to handle editing of todo Text
  const handleEditTodo = (e) => {
    e.preventDefault();
    const todoText = e.target["todo"].value;
    onTodoTextUpdate(item.id, todoText);
    setShowEditTodo(false);
  }
 
  // [2.] Rendering 'todoEditForm' div component when editing a Todo item.
  const todoEditForm = (
    <div className="flex justify-between items-center bg-gray-900 px-4 py-2 min-h-20 rounded-lg group">
      <form onSubmit={handleEditTodo} className="flex-1 flex items-center px-4 gap-4">
        <input className="flex-1 outline-none border-2 border-secondary-text px-4 py-2 rounded-lg font-body" type="text" 
          name="todo" defaultValue={item.text} required
        />
        <button className="text-accent cursor-pointer hover:bg-neutral-800"> <Check size={30}/> </button>
      </form>

      <button onClick={() => setShowEditTodo(false)} className="text-red-500 cursor-pointer hover:bg-neutral-800"> 
        <CircleX size={30}/> 
      </button>
    </div>
  );

  // [3.] Rendering 'todoItemDiv' when todo component is not in editing mode or todo is in static mode.
  const todoItemDiv = (
    <div className="flex gap-4 justify-between items-center hover:bg-gray-700 px-4 py-2 rounded-lg group">
      <div className="flex flex-col gap-1 text-secondary-text">
        <button onClick={() => onTodoMoveUp(index)} disabled={index===0} className="hover:bg-gray-700 rounded-md p-1 cursor-pointer"> 
          <ChevronUp/> 
        </button>
        <button onClick={() => onTodoMoveDown(index)} disabled={index===todosLength-1} className="hover:bg-gray-700 p-1 
          rounded-md cursor-pointer"> 
          <ChevronDown/> 
        </button>
      </div>

      <div className="flex-1 flex gap-4 items-center">
        <CheckBox id={item.id} checked={item.completed} onChange={(e) => onTodoToggle(item.id, e.target.checked)} label={item.text}/>
      </div>
      
      <div className="hidden group-hover:flex gap-4">
        <button onClick={() => setShowEditTodo(true)} className="cursor-pointer text-blue-500"> <SquarePen/> </button>
        <button onClick={() => onTodoDelete(item.id)} className="text-red-500 cursor-pointer"> <Trash2/> </button>
      </div>
    </div>
  );

  return (
    <div className="border-t border-secondary-text pt-4 "> 
      {showEditTodo == true ? (todoEditForm) : (todoItemDiv)} 
    </div>
  )
}

export default TodoItem;