# Apex Reactive Store 

- clean and easy to use
- tiny and powerfull and reactive

## Example Todo App
- Repo (https://github.com/WaiYanLin71/react-todo-with-apex)
- Demo (https://waiyanlin71.github.io/react-todo-with-apex)

## installation

```
npm i apex-reactive-store@2.0.0
```

## Create Store

```js
import createStore from "apex-reactive-store-v2";

const store = createStore({
    name: 'todo',
    initial: {
        data: (() => {
            try {
                return JSON.parse(localStorage.getItem('todo')) || []
            } catch (error) {
                localStorage.clear();
                return [];
            }
        })(),
    },
    reducers: {
        create(state, payload) {
            state.data.push(payload)
        },

        remove(state, payload) {
            const index = state.data.findIndex(todo => todo.id === payload.id);
            if (~index) state.data.splice(index, 1)
        },

        update(state, payload) {
            const index = state.data.find(todo => todo.id === payload.id);
            if (~index) state.data[index] = { ...state.data[index], ...payload.data };
        },

        checked(state, payload) {
            const index = state.data.findIndex(todo => todo.id === payload.id);
            if (~index) state.data[index]['completed'] = payload.completed;
        },

        clearCompleted(state) {
            state.data = state.data.filter(todo => !todo.completed)
        },

        checkedAll(state) {
            state.data = state.data.map((todo) => {
                todo.completed = true;
                return todo;
            })
        },

        unCheckedAll(state) {
            state.data = state.data.map((todo) => {
                todo.completed = false;
                return todo;
            })
        }
    }

});

const useApexStore = store.defineApexStore;

export const { create, remove, update, checked, clearCompleted, checkedAll, unCheckedAll } = store.actions;

export default useApexStore;

```

## Use 

```js
import useApexStore, { create } from "../store";
import { useEffect } from 'react'

const TodoForm = () => {

    const [state, dispatch] = useApexStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = new Date().getTime();
        const formData = new FormData(e.target)
        const todo = formData.get('todo');
        dispatch(create({ id, name: todo, completed: false }))
        e.target.reset();
    }

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(state.data))
    }, [state.data])

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

