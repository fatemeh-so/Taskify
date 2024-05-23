import React from 'react';

function Dashboard() {
  return (
    <>
    
      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen">
        <div className="col-span-1 row-span-1 bg-blue-200 p-4">
          <p>Content 1</p>
        </div>
        <div className="col-span-1 row-span-1 bg-green-200 p-4">
          <p>Content 2</p>
        </div>
        <div className="col-span-2 row-span-2 bg-red-200 p-4">
          <p>Content 3 (Vertical)</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
