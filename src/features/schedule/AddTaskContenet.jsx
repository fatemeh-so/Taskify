/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import {
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
} from '@nextui-org/react'
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
import {
  ListPlus,
  Trash,
  CheckSquare,
  Plus,
  Tag,
  Flag,
  Hash,
} from 'phosphor-react'
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
      className='min-h-full bg-white px-6 pb-8'
    >
      <div className='max-w-4xl mx-auto space-y-8 pt-6'>
        {/* Main Info */}
        <div className='bg-white space-y-6'>
          <Input
            fullWidth
            size='lg'
            label={t('title')}
            labelPlacement='outside'
            placeholder={t('titleInput')}
            onChange={(event) => {
              dispatch(addTitle(event.target.value))
            }}
            classNames={{
              input: 'text-lg font-medium',
              inputWrapper:
                'h-14 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 transition-colors',
            }}
            variant='flat'
          />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Select
              label={t('category')}
              labelPlacement='outside'
              size='lg'
              placeholder='Select category'
              startContent={<Tag size={18} className='text-default-400' />}
              onChange={(e) => handleCategoryChange(e.target.value)}
              variant='flat'
              selectionMode='single'
              classNames={{
                trigger: 'bg-gray-50 hover:bg-gray-100 h-14',
              }}
            >
              {categories.map((c) => (
                <SelectItem
                  dir={i18n.language === 'en' ? 'ltr' : 'rtl'}
                  key={c.id}
                  value={c.id.toString()}
                >
                  {c.name[i18n.language]}
                </SelectItem>
              ))}
            </Select>

            <Select
              label={t('priority')}
              labelPlacement='outside'
              size='lg'
              placeholder='Select Priority'
              startContent={<Flag size={18} className='text-default-400' />}
              onChange={(e) => handlePriorityChange(e.target.value)}
              variant='flat'
              selectionMode='single'
              classNames={{
                trigger: 'bg-gray-50 hover:bg-gray-100 h-14',
              }}
            >
              {priorities.map((p) => (
                <SelectItem
                  dir={i18n.language === 'en' ? 'ltr' : 'rtl'}
                  key={p.id}
                  value={p.id.toString()}
                  className={p.color}
                >
                  {p.name[i18n.language]}
                </SelectItem>
              ))}
            </Select>

            <Select
              label={t('status')}
              labelPlacement='outside'
              isRequired
              size='lg'
              placeholder='Select Status'
              startContent={<Hash size={18} className='text-default-400' />}
              onChange={(e) => handleStatusChange(e.target.value)}
              variant='flat'
              selectionMode='single'
              errorMessage={statusError ? t('statusRe') : ''}
              isInvalid={statusError}
              classNames={{
                trigger: 'bg-gray-50 hover:bg-gray-100 h-14',
              }}
            >
              {statuses.map((s) => (
                <SelectItem
                  dir={i18n.language === 'en' ? 'ltr' : 'rtl'}
                  key={s.id}
                  value={s.id.toString()}
                >
                  {s.name[i18n.language]}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Checklist Section */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-700 flex items-center gap-2'>
              <CheckSquare size={20} />
              {t('Checklist', { defaultValue: 'Subtasks' })}
            </h3>
            <Button
              size='sm'
              color='primary'
              variant='light'
              onClick={addTodo}
              startContent={<Plus size={16} weight='bold' />}
            >
              {t('addTodo')}
            </Button>
          </div>

          <div className='space-y-3'>
            {todos.map((todo) => (
              <div key={todo.id} className='flex items-center gap-3 group'>
                <Checkbox
                  size='lg'
                  radius='full'
                  isSelected={todo.completed}
                  onValueChange={() => toggleTodoCompleted(todo.id)}
                  color='success'
                />
                <Input
                  fullWidth
                  size='md'
                  value={todo.text}
                  onChange={(e) => handleTodoChange(todo.id, e.target.value)}
                  type='text'
                  variant='underlined'
                  placeholder={t('newTask', {
                    defaultValue: 'Add a subtask description',
                  })}
                  classNames={{
                    input: 'text-gray-700',
                    inputWrapper: 'shadow-none !border-b-small border-gray-200',
                  }}
                />
                <Button
                  onClick={() => handleDeleteTodo(todo.id)}
                  color='danger'
                  isIconOnly
                  size='sm'
                  variant='light'
                  className='opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <Trash size={18} />
                </Button>
              </div>
            ))}
            {todos.length === 0 && (
              <div className='text-gray-400 text-sm italic py-4 text-center border-2 border-dashed border-gray-100 rounded-xl'>
                No subtasks added yet
              </div>
            )}
          </div>
        </div>

        <div className='pt-4 border-t border-gray-100'>
          <Button
            color='primary'
            onClick={handleAddTask}
            className='w-full text-lg font-bold h-14'
            shadow='md'
          >
            {t('addTask')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskContent
