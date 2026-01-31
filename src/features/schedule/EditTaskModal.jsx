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
import {
  ListPlus,
  Trash,
  CheckSquare,
  Plus,
  Tag,
  Flag,
  Hash,
} from 'phosphor-react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetTask from './useGetTask'
import Spinner from '../../components/Spinner'
import useEditTask from './useEditTask'
import { useTranslation } from 'react-i18next'

const priorities = [
  { id: 1, name: { en: 'Low', fa: 'کم' }, color: 'text-green-500' },
  { id: 2, name: { en: 'Medium', fa: 'متوسط' }, color: 'text-yellow-500' },
  { id: 3, name: { en: 'High', fa: 'بالا' }, color: 'text-red-500' },
  { id: 4, name: { en: 'Urgent', fa: 'فوری' }, color: 'text-purple-500' },
]

export default function EditTaskModal() {
  const { t, i18n } = useTranslation()
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
  console.log(categories)
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask?.title || '')
      setCategory(currentTask?.category || '')
      setPriority(currentTask?.priority || '')
      setTodos(currentTask?.description || [])
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
      setCategory(selectedCategory.name.en)

      // setCategory(selectedCategory.name)
    }
  }

  const handlePriorityChange = (value) => {
    const selectedPriority = priorities.find(
      (priority) => priority.id.toString() === value
    )
    if (selectedPriority) {
      setPriority(selectedPriority.name.en)
    }
  }
  const handleStatusChange = (value) => {
    const selectedStatus = statuses.find(
      (status) => status.id.toString() === value
    )
    if (selectedStatus) {
      setCurrentStatus(selectedStatus.name.en)
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
      isOpen={true}
      onOpenChange={() => {
        dispatch(closeEditTask())
        navigate('/schedule')
      }}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      size='3xl'
      scrollBehavior='inside'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-2xl font-bold p-6 border-b border-gray-100'>
              Edit Task
            </ModalHeader>
            <ModalBody className='p-6'>
              <div className='w-full flex flex-col gap-8'>
                {/* Info Section */}
                <div className='space-y-6'>
                  <Input
                    fullWidth
                    size='lg'
                    label='Title'
                    labelPlacement='outside'
                    value={title}
                    onChange={handleTitleChange}
                    variant='flat'
                    classNames={{
                      input: 'text-lg font-medium',
                      inputWrapper:
                        'h-14 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 transition-colors',
                    }}
                  />

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Select
                      label={t('category')}
                      labelPlacement='outside'
                      size='lg'
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      variant='flat'
                      selectionMode='single'
                      startContent={
                        <Tag size={18} className='text-default-400' />
                      }
                      classNames={{
                        trigger: 'bg-gray-50 hover:bg-gray-100 h-14',
                      }}
                    >
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.name[i18n.language]}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      label={t('priority')}
                      labelPlacement='outside'
                      size='lg'
                      onChange={(e) => handlePriorityChange(e.target.value)}
                      variant='flat'
                      selectionMode='single'
                      startContent={
                        <Flag size={18} className='text-default-400' />
                      }
                      classNames={{
                        trigger: 'bg-gray-50 hover:bg-gray-100 h-14',
                      }}
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
                      label={t('status')}
                      labelPlacement='outside'
                      size='lg'
                      onChange={(e) => handleStatusChange(e.target.value)}
                      variant='flat'
                      selectionMode='single'
                      startContent={
                        <Hash size={18} className='text-default-400' />
                      }
                      classNames={{
                        trigger: 'bg-gray-50 hover:bg-gray-100 h-14',
                      }}
                    >
                      {statuses.map((s) => (
                        <SelectItem key={s.id} value={s.id.toString()}>
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
                      Checklist
                    </h3>
                    <Button
                      size='sm'
                      color='primary'
                      variant='light'
                      onClick={handleAddTodo}
                      startContent={<Plus size={16} weight='bold' />}
                    >
                      Add Item
                    </Button>
                  </div>

                  <div className='space-y-3'>
                    {todos.map((s, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-3 group'
                      >
                        <Checkbox
                          size='lg'
                          radius='full'
                          isSelected={s.completed}
                          onValueChange={(e) =>
                            handleTodoChange(index, 'completed', e)
                          }
                          color='success'
                        />
                        <Input
                          fullWidth
                          size='md'
                          value={s.text}
                          onChange={(e) =>
                            handleTodoChange(index, 'text', e.target.value)
                          }
                          type='text'
                          variant='underlined'
                          placeholder='New task'
                          classNames={{
                            input: 'text-gray-700',
                            inputWrapper:
                              'shadow-none !border-b-small border-gray-200',
                          }}
                        />
                        <Button
                          onClick={() => handleDeleteTodo(index)}
                          color='danger'
                          isIconOnly
                          size='sm'
                          variant='light'
                          className='opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                          <Trash size={20} />
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
              </div>
            </ModalBody>
            <ModalFooter className='p-6 border-t border-gray-100'>
              <Button
                color='danger'
                variant='light'
                onPress={() => {
                  dispatch(closeEditTask())
                  navigate('/schedule')
                }}
              >
                Cancel
              </Button>
              <Button
                color='primary'
                onClick={() => handleSaveTask(currentTask.id)}
                className='font-semibold'
              >
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
