import { Input } from '@nextui-org/react';
import TimerProjectSettings from './TimerProjectSetting';

function TimerProject() {
  return (
    <div className="mt-6 w-full h-full">
      <div className="shadow-lg mr-4 bg-white h-auto flex flex-col rounded-xl mt-3 ml-2">
        <div className="flex justify-between items-center p-4 bg-slate-300 w-full rounded-t-xl shadow-sm">
          <span className="text-gray-700 font-semibold">##/##/##</span>
          <span className="text-gray-900 text-xl font-bold">00:00:00</span>
        </div>
        <div className="flex items-center justify-between w-auto gap-5 p-4">
          <Input
            className="w-1/3 px-3 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Add Description"
          />
          <div className="flex items-center gap-5">
            <div className="flex justify-end items-center gap-1 text-gray-700">
              <span>00:00</span>
              <span>-</span>
              <span>00:00</span>
            </div>
            <span className="text-gray-700">00:00:00</span>
            <TimerProjectSettings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerProject;
