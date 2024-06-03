import { Chip } from "@nextui-org/react"

function TaskReview() {
  return (
    <div className="w-[98%] p-8 md:m-[1rem] xl:m-[1rem] h-full bg-ed-100">
      <h1 className="text-xl text-gray-600  font-bold mb-4">Task Review</h1>
      <div className="xl:w-1/4 md:w-2/4">
        <div className="p-4 overflow-x-hidden bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <div className="font-bold sm:text-xl md:text-lg text-gray-800 mb-2 sm:mb-0" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
              <span>xxxx</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base text-gray-600">
                xxxx{/* {task?.duration ? new Date(task.duration * 1000).toISOString().substr(11, 8) : ''} */}
              </span>
              <Chip size="sm" variant="flat">
                xxxx {/* {task.priority} */}
              </Chip>
            </div>
          </div>
          <div className="border p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {/* {categoryIcons[task?.category]} */}
                <span className="ml-3 text-gray-700 text-lg">xxxx{/* {task?.category} */}</span>
              </div>
            </div>
            <div className="text-gray-700">
              {/* {task?.description?.map((desc, index) => (
                <div key={index} className="flex justify-start mt-2 mb-2">
                  <Checkbox lineThrough defaultSelected={desc?.completed}>
                    <span className="ml-3" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {desc.text}
                    </span>
                  </Checkbox>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskReview
