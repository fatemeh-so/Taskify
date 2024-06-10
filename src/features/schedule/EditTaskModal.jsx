/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
} from '@nextui-org/react'
import { useSelector, useDispatch } from 'react-redux'
import { closeEditTask } from './taskSlice'
import { ListPlus, Trash } from 'phosphor-react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetTask from './useGetTask'
import Spinner from '../../components/Spinner'
import useEditTask from './useEditTask'

const priorities = [
  { id: 1, name: 'Low', color: 'text-green-500' },
  { id: 2, name: 'Medium', color: 'text-yellow-500' },
  { id: 3, name: 'High', color: 'text-red-500' },
  { id: 4, name: 'Urgent', color: 'text-purple-500' },
]

export default function EditTaskModal() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: task, isLoading } = useGetTask()
  const { mutate: editTaskTodo, isLoading: isEdit } = useEditTask()
  const { OpenEditTask, categories, statuses } = useSelector(
    (store) => store.task
  )
  const { scheduleId } = useParams()

  const currentTask = task?.find((t) => String(t.id) === scheduleId) || {}

  const [title, setTitle] = useState(currentTask.title || '')
  const [category, setCategory] = useState(currentTask.category || '')
  const [priority, setPriority] = useState(currentTask.priority || '')
  const [todos, setTodos] = useState(currentTask.description || [])
  const [currentStatus, setCurrentStatus] = useState(currentTask.status || '')
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title || '')
      setCategory(currentTask.category || '')
      setPriority(currentTask.priority || '')
      setTodos(currentTask.description || [])
    }
  }, [task, scheduleId])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find(
      (category) => category.id.toString() === value
    )
    if (selectedCategory) {
      setCategory(selectedCategory.name)
    }
  }

  const handlePriorityChange = (value) => {
    const selectedPriority = priorities.find(
      (priority) => priority.id.toString() === value
    )
    if (selectedPriority) {
      setPriority(selectedPriority.name)
    }
  }
  const handleStatusChange = (value) => {
    const selectedStatus = statuses.find(
      (status) => status.id.toString() === value
    )
    if (selectedStatus) {
      setCurrentStatus(selectedStatus.name)
    }
  }
  const handleTodoChange = (index, field, value) => {
    const newTodos = [...todos]
    newTodos[index][field] = value
    setTodos(newTodos)
  }

  const handleAddTodo = () => {
    setTodos([...todos, { text: '', completed: false }])
  }

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const handleSaveTask = (id) => {
    const updatedTask = {
      ...currentTask,
      title,
      category,
      priority,
      description: todos,
    }

    // Dispatch action to save updatedTask

    dispatch(closeEditTask())
    navigate('/schedule')
    editTaskTodo({
      id,
      title,
      category,
      priority,
      description: todos,
      status: currentStatus,
    })
  }

  if (isLoading || isEdit) return <Spinner />
  return (
    <Modal
      isOpen={OpenEditTask}
      onOpenChange={() => {
        dispatch(closeEditTask())
        navigate('/schedule')
      }}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Edit Task</ModalHeader>
            <ModalBody>
              <div className='w-full flex flex-col gap-4'>
                <Input
                  size='lg'
                  color='secondary'
                  onChange={handleTitleChange}
                  type='text'
                  variant='underlined'
                  label='Title'
                  value={title}
                />
                <div className=' sm:flex-row gap-4'>
                  <Select
                    label='Category'
                    size='lg'
                    color='secondary'
                    className='flex-1'
                    variant='underlined'
                    selectionMode='single'
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label='Priority'
                    size='lg'
                    color='secondary'
                    className='flex-1'
                    variant='underlined'
                    selectionMode='single'
                    onChange={(e) => handlePriorityChange(e.target.value)}
                  >
                    {priorities.map((p) => (
                      <SelectItem
                        key={p.id}
                        value={p.id.toString()}
                        className={p.color}
                      >
                        {p.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    // fullWidth
                    label='Status'
                    size='lg'
                    onChange={(e) => handleStatusChange(e.target.value)}
                    color='secondary'
                    variant='underlined'
                    selectionMode='single'
                  >
                    {statuses.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Button
                  variant='bordered'
                  isIconOnly
                  size='sm'
                  className='self-start'
                  onClick={handleAddTodo}
                >
                  <ListPlus size={28} color='#790c79' />
                </Button>
                <div className='mt-4'>
                  {todos.map((s, index) => (
                    <div key={index} className='flex gap-3'>
                      <Checkbox
                        size='lg'
                        checked={s.completed}
                        onChange={(e) =>
                          handleTodoChange(index, 'completed', e.target.checked)
                        }
                      />
                      <Input
                        size='sm'
                        color='secondary'
                        value={s.text}
                        onChange={(e) =>
                          handleTodoChange(index, 'text', e.target.value)
                        }
                        type='text'
                        variant='underlined'
                        placeholder='New task'
                      />
                      <Button
                        onClick={() => handleDeleteTodo(index)}
                        color='danger'
                        isIconOnly
                        size='sm'
                        className=''
                        variant='bordered'
                      >
                        <Trash size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  color='primary'
                  onClick={() => handleSaveTask(currentTask.id)}
                >
                  Save Task
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='light'
                onPress={() => {
                  dispatch(closeEditTask())
                  navigate('/schedule')
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
