import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import useGetTask from '../features/schedule/useGetTask';
import Spinner from '../components/Spinner';
import TaskReport from '../features/dashboard/TaskReport';
import TaskReview from '../features/dashboard/TaskReview';

function Dashboard() {
  const { data: task, isLoading: isTask } = useGetTask();
  const scrollContainerRef = useRef(null);

  if (isTask) return <Spinner />;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full px-4">
      <TaskReport />
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-6 mb-4">
        In Progress Review
      </h1>
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-white p-2 rounded-full z-10 shadow-md"
          onClick={scrollLeft}
          aria-label="Scroll Left"
        >
          <ArrowLeft size={24} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex justify-start items-start overflow-x-hidden space-x-4 p-4"
        >
          {task.map((task) => (
            <TaskReview key={task.id} task={task} />
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-white p-2 rounded-full z-10 shadow-md"
          onClick={scrollRight}
          aria-label="Scroll Right"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
