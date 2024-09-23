import { useState, useEffect } from 'react'
import { Button, Input, Select, SelectItem, Checkbox } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CloseAddTask,
  addCategories,
  addPriority,
  addStatus,
  addTask,
  addTitle,
  addToDoValue,
  clearAllField,
} from './taskSlice'
import { ListPlus, Trash } from 'phosphor-react'
import useAddTask from './useTask'
import Spinner from '../../components/Spinner'
import useGetTask from './useGetTask'
import useGetUser from '../auth/useGetUser'

function AddTaskContent() {
  const { mutate: addTaskTo, isLoading } = useAddTask()
  const { data: task, isLoading: isTask } = useGetTask()
  const { data: user, isLoading: isUser } = useGetUser()
  const priorities = [
    { id: 1, name: 'Low', color: 'text-green-500' },
    { id: 2, name: 'Medium', color: 'text-yellow-500' },
    { id: 3, name: 'High', color: 'text-red-500' },
    { id: 4, name: 'Urgent', color: 'text-purple-500' },
  ]
  const {
    statuses,
    title,
    categories,
    currentCategory,
    todoValue,
    currentPriority,
    currentStatus,
  } = useSelector((store) => store.task)
  const dispatch = useDispatch()

  const [todos, setTodos] = useState([])
  const [statusError, setStatusError] = useState(false)

  useEffect(() => {
    dispatch(addToDoValue(todos))
  }, [todos, dispatch])

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find(
      (category) => category.id.toString() === value
    )
    if (selectedCategory) {
      dispatch(addCategories(selectedCategory.name))
    }
  }

  const handlePriorityChange = (value) => {
    const selectedPriority = priorities.find(
      (priority) => priority.id.toString() === value
    )
    if (selectedPriority) {
      dispatch(addPriority(selectedPriority.name))
    }
  }

  const handleStatusChange = (value) => {
    const selectedStatus = statuses.find(
      (status) => status.id.toString() === value
    )
    if (selectedStatus) {
      dispatch(addStatus(selectedStatus.name))
      setStatusError(false) // Clear error if status is selected
    }
  }

  const addTodo = () => {
    const newTodo = { id: Date.now(), text: '', completed: false }
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const handleTodoChange = (id, text) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    )
  }

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const toggleTodoCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleAddTask = () => {
    if (!currentStatus) {
      setStatusError(true)
      return
    }
    const created_at = new Date()
    const user_id = user.id // Assuming `user` contains the user data including user ID

    const task = {
      title,
      category: currentCategory,
      priority: currentPriority,
      description: todoValue,
      status: currentStatus,
      created_at,
      user_id, // Include user_id in the task object
    }

    dispatch(addTask(task))
    addTaskTo(task)
    dispatch(CloseAddTask())
    dispatch(clearAllField())
  }

  if (isLoading || isTask || isUser) return <Spinner />
  return (
    <div className='container h-full overflow-y-auto b-red-900 md:px-6 px-4 py-4'>
      <div className='h-full rounded-lg bg-white px-4'>
        <h3 className='text-xl font-semibold text-center text-gray-700'>
          Add New Task
        </h3>
        <div className='flex flex-col gap-6'>
          <Input
            fullWidth
            size='lg'
            color='secondary'
            onChange={(event) => {
              dispatch(addTitle(event.target.value))
            }}
            type='text'
            variant='underlined'
            label='Title'
            placeholder='Enter task title'
          />
          <div className='flex flex-col md:flex-row gap-6'>
            <Select
              fullWidth
              label='Category'
              size='lg'
              onChange={(e) => handleCategoryChange(e.target.value)}
              color='secondary'
              variant='underlined'
              selectionMode='single'
            >
              {categories.map((c) => (
                <SelectItem color='primary' key={c.id} value={c.id.toString()}>
                  {c.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              fullWidth
              label='Priority'
              size='lg'
              onChange={(e) => handlePriorityChange(e.target.value)}
              color='secondary'
              variant='underlined'
              selectionMode='single'
            >
              {priorities.map((p) => (
                <SelectItem
                  className={p.color}
                  key={p.id}
                  value={p.id.toString()}
                >
                  {p.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              fullWidth
              label='Status'
              isRequired={true}
              size='lg'
              onChange={(e) => handleStatusChange(e.target.value)}
              color='secondary'
              variant='underlined'
              selectionMode='single'
              // defaultSelectedKeys="Not Started"
              error={statusError}
            >
              {statuses.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  {s.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          {statusError && (
            <p className='text-red-500 text-sm'>Status is required.</p>
          )}
          <Button
            bordered
            // size='smg'
            onClick={addTodo}
            className='flex mt-4 w-full md:w-auto items-center gap-2 self-start'
          >
            <ListPlus size={24} />
            Add Todo
          </Button>
          <div className='mt-4'>
            {todos.map((todo) => (
              <div key={todo.id} className='flex items-center py-2 gap-4 mb-2'>
                <Checkbox
                  size='lg'
                  checked={todo.completed}
                  onChange={() => toggleTodoCompleted(todo.id)}
                  lineThrough
                />
                <Input
                  fullWidth
                  size='sm'
                  color='secondary'
                  value={todo.text}
                  onChange={(e) => handleTodoChange(todo.id, e.target.value)}
                  type='text'
                  variant='underlined'
                  placeholder='New task'
                />
                <Button
                  onClick={() => handleDeleteTodo(todo.id)}
                  color='error'
                  isIconOnly
                  auto
                >
                  <Trash size={20} />
                </Button>
              </div>
            ))}
          </div>
          <Button
            className='lg:mb-[2rem] md:mb-[7rem]'
            color='secondary'
            onClick={handleAddTask}
            fullWidth
          >
            Add Task
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskContent
