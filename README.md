# Apex Reactive Store 

- clean and easy to use
- like react context api but more easy to use

## Example Todo App
- Repo (https://github.com/WaiYanLin71/react-todo-with-apex)
- Demo (https://waiyanlin71.github.io/react-todo-with-apex)

## installation

```
npm i apex-reactive-store
```

## Example

configure store

```js
import defineApex from 'apex-reactive-store'

const useApexStore = defineApex({
 name:'todo' //store name,
 initial:[], initial state,
 reducer:(state, action) => {
 
    if(action.type === 'STORE') {
      return [...state, action.data]
 
    }
 } 
})

export default useApexStore;
```

use store

```js
import useApexStore from './store.js';

const [sate, dispatch] = useApexStore() //sate => initial value, dispatch => for change state
dispatch({type:'store':data:{id,name,completed})
```

## Todo App with apex store

store.js

```js
import defineApex from 'apex-reactive-store'

export const useApexStore = defineApex({
    name: 'todo',
    initial: [],
    reducer: (state, action) => {
        switch (action.type) {
            case 'STORE':
                return [...state, action.data]
            case 'CHECK':
                return state.map(todo => {
                    if (todo.id === action.id) todo.completed = action.checked
                    return todo;
                })
            case 'CHECK_ALL':
                return state.map(todo => {
                    todo.completed = true
                    return todo;
                })
            case 'UNCHECK_ALL':
                return state.map(todo => {
                    todo.completed = false
                    return todo;
                })
            case 'DELETE':
                return state.filter(todo => todo.id !== action.id)
            case 'CLEAR_COMPLETED':
                return state.filter(todo => !todo.completed)
            default:
                return state
        }

    }
});
```
form.js

``` js
import { useApexStore } from "../store";

const TodoForm = () => {

    const [state, dispatch] = useApexStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = new Date().getTime();
        const formData = new FormData(e.target)
        const todo = formData.get('todo');
        dispatch({ type: 'STORE', data: { id, name: todo, completed: false } })
        e.target.reset();
    }

    return (
        <form className='flex  items-end' onSubmit={handleSubmit}>
            <div className='w-full'>
                <label htmlFor="todo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Todo</label>
                <input type="text"
                    name='todo'
                    className="bg-gray-50  border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="ml-2">
                <button type="submit"
                    className="btn-main">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
        </form>
    )
}

export default TodoForm
```
