import { XCircle } from 'phosphor-react'
import AddTaskContent from './AddTaskContenet'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function AddTask({ onClose, close }) {
  const { t } = useTranslation()
  return (
    <AnimatePresence>
      {close && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className='fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50 backdrop-blur-sm'
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='flex flex-col w-full md:w-3/4 xl:w-2/4 bg-white shadow-2xl'
          >
            <div className='flex items-center justify-between p-6 border-b border-gray-100'>
              <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>
                {t('addNewTask')}
              </h2>
              <motion.button
                onClick={onClose}
                className='p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <XCircle size={32} weight='fill' />
              </motion.button>
            </div>
            <div className='flex-grow overflow-y-auto'>
              <AddTaskContent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddTask
