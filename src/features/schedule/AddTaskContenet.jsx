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
import { useTranslation } from 'react-i18next'

function AddTaskContent() {
  const { t, i18n } = useTranslation()
  const { mutate: addTaskTo, isLoading } = useAddTask()
  const { isLoading: isTask } = useGetTask()
  const { data: user, isLoading: isUser } = useGetUser()
  const priorities = [
    { id: 1, name: { en: 'Low', fa: 'کم' }, color: 'text-green-500' },
    { id: 2, name: { en: 'Medium', fa: 'متوسط' }, color: 'text-yellow-500' },
    { id: 3, name: { en: 'High', fa: 'بالا' }, color: 'text-red-500' },
    { id: 4, name: { en: 'Urgent', fa: 'فوری' }, color: 'text-purple-500' },
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
      dispatch(addCategories(selectedCategory.name.en))
    }
  }

  const handlePriorityChange = (value) => {
    const selectedPriority = priorities.find(
      (priority) => priority.id.toString() === value
    )
    if (selectedPriority) {
      dispatch(addPriority(selectedPriority.name.en))
    }
  }

  const handleStatusChange = (value) => {
    const selectedStatus = statuses.find(
      (status) => status.id.toString() === value
    )
    if (selectedStatus) {
      dispatch(addStatus(selectedStatus.name.en))
      setStatusError(false)
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
    const created_at = new Date().toISOString()
    const user_id = user.id

    const task = {
      title,
      category: currentCategory,
      priority: currentPriority,
      description: todoValue,
      status: currentStatus,
      created_at,
      user_id,
    }
    dispatch(addTask(task))
    addTaskTo(task)
    dispatch(CloseAddTask())
    dispatch(clearAllField())
  }

  if (isLoading || isTask || isUser) return <Spinner />
  return (
    <div
      dir={i18n.language == 'en' ? 'ltr' : 'rtl'}
      className='container h-full overflow-y-auto b-red-900 md:px-6 px-4 py-4'
    >
      <div className='h-full rounded-lg bg-white px-4'>
        <h3 className='text-xl font-semibold text-center text-gray-700'>
          {t('addNewTask')}
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
            label={t('title')}
            placeholder={t('titleInput')}
          />
          <div className='flex flex-col md:flex-row gap-6'>
            <Select
              fullWidth
              label={t('category')}
              size='lg'
              onChange={(e) => handleCategoryChange(e.target.value)}
              color='secondary'
              variant='underlined'
              selectionMode='single'
            >
              {categories.map((c) => (
                <SelectItem color='primary' key={c.id} value={c.id.toString()}>
                  {c.name[i18n.language]}
                </SelectItem>
              ))}
            </Select>
            <Select
              fullWidth
              label={t('priority')}
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
                  {p.name[i18n.language]}
                </SelectItem>
              ))}
            </Select>
            <Select
              fullWidth
              label={t('status')}
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
                  {s.name[i18n.language]}
                </SelectItem>
              ))}
            </Select>
          </div>
          {statusError && (
            <p className='text-red-500 text-sm'>{t('statusRe')}</p>
          )}
          <Button
            bordered
            // size='smg'
            onClick={addTodo}
            className='flex mt-4  text-bold  md:text-lg w-full md:w-auto items-center gap-2 self-start'
          >
            <ListPlus size={24} />
            {t('addTodo')}
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
            className='lg:mb-[2rem] md:mb-[7rem] text-bold text-white text-md md:text-lg'
            color='secondary'
            onClick={handleAddTask}
            fullWidth
          >
            {t('addTask')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskContent
