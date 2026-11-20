import { useState } from 'react'
import TodoItem from "./TodoItem";
import {SquarePlus, Trash2, ArrowDownAZ, Rabbit} from "lucide-react";

const TodoPage = () => {

  const [todos, setTodos] = useState([]);

  // [1.] Function to handle form submission.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const todoText = event.target["todo"].value;
    //console.log(todoText);

    if(!todoText) 
      return;
    //storing each new Todo text as Array of objects in new Array "newTodos"
    const newTodos = [...todos, {text: todoText, id: crypto.randomUUID(), completed: false}];
    setTodos(newTodos);
    event.target.reset();  //cleans input field after submitting/setting
  }
  // id: crypto.randomUUID(), --- way to generate random IDs

  // [2.] Function to handle sorting of todo texts in the todo form.
  const compareFunction = (a, b) => (a.text.localeCompare(b.text)); // JS localeCompare() method is used to compare two strings.
  const handleSortTodos = () => {
    const newTodos = [...todos];
    newTodos.sort(compareFunction);
    setTodos(newTodos);
  }
  // [3.] Function to check if the todos are already sorted. 
  const isSortedTodos = todos.every((todo, index, arr) => { 
    return index===0 || compareFunction(arr[index-1], todo) <= 0; 
  })

  // [4.] Function to handle deletion of all to-do text at once.
  const handleDeleteAll = () => {
    setTodos([]);
  }

  // [5.] To check which item is completed or not.
  const completedTodos = todos.filter(item => item.completed).length;

  // [6.] Function to handle checkbox toggle.
  const onTodoToggle = (id, checked) => {
    const newTodos = todos.map(item => {
      if(item.id === id) {return {...item, completed: checked};}
      return item;
    })
    setTodos(newTodos);
    // console.log(checked);
  }

  // [7.] Function to handle deletion of to-do text.
  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  }

  // [8.] Function to handle editing of todoText.
  const handleTodoTextUpdate = (id, todoText) => {
    if(!todoText) 
      return;
    const newTodos = todos.map(item => {
      if(item.id === id) {return {...item, text: todoText};}
      return item;
    })
    setTodos(newTodos);
  }

  // [9.] Function for moving the todo text items up and down.
  const handleTodoMoveUp = (index) => {
    if(index === 0)
      return;
    const newTodos = [...todos];
    //for swapping 2 variables a & b write like, [a,b] = [b,a] 
    [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
    setTodos(newTodos);
  }

  const handleTodoMoveDown = (index) => {
    if(index === todos.length - 1)
      return;
    const newTodos = [...todos];
    [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
    setTodos(newTodos);
  }

  // [10.] Message to show, if there is no todoText in the list.
  const emptyState = (
    <div className='mt-12 flex flex-col gap-8 items-center text-secondary-text'>
      <Rabbit size={80}/> 
      <p className='italic text-lg'> There is no todo's in the list now ! </p>
    </div>
  )

  return (
    <div className='max-w-2xl mx-auto p-10 lg:p-6 space-y-6'>
      <h1 className='font-display text-center text-6xl font-bold text-accent align-middle'> Super Todo </h1>
      <p className='text-center text-lg font-normal text-secondary-text italic hover:underline cursor-pointer'> 
        Manage your Todos with Ease !
      </p>

      <form onSubmit={handleFormSubmit} className='bg-gray-700 px-6 py-2 rounded-xl flex justify-between gap-4'>
        <input type='text' name='todo' placeholder="Enter Your Todo's Here" className='flex-1 focus:outline-none font-body' required/>
        <button className='p-3 bg-pink-500 rounded-lg text-black cursor-pointer hover:bg-accent-hover'> 
          <SquarePlus/> 
        </button> 
      </form>

      <div className="flex justify-center gap-6">
        {isSortedTodos === false ? 
         (<button onClick={handleSortTodos} className='px-4 py-2 ring-2 ring-accent rounded-lg cursor-pointer flex items-center 
           gap-2 hover:text-black hover:bg-accent'> 
            <ArrowDownAZ size={25}/> Sort To-Do 
         </button>) : (null)
        }

        {todos.length > 0 ? 
          (<button onClick={handleDeleteAll} className='px-4 py-2 ring-2 ring-red-400 cursor-pointer rounded-lg flex items-center 
           gap-2 hover:bg-red-400 hover:text-black'> 
            <Trash2 size={25}/> Delete All Todo's
          </button>) : (null)
        }
      </div>
      
      {todos.length > 0 && (<h3 className='text-secondary-text text-right'> {completedTodos}/{todos.length} Completed </h3>)}

      {/* Rendering "TodoItem" component using ternary operator */}
      {todos.length > 0 ? 
        (<div>
          {todos.map((item, index) => (
            <TodoItem key={item.id} item={item} 
              onTodoToggle={onTodoToggle} 
              onTodoDelete={handleDeleteTodo} 
              onTodoTextUpdate={handleTodoTextUpdate} 
              onTodoMoveUp={handleTodoMoveUp} 
              onTodoMoveDown={handleTodoMoveDown}
              index={index} 
              todosLength={todos.length}
            />
          ))}
        </div>): (emptyState)
      } 

    </div>
  )
}

export default TodoPage;