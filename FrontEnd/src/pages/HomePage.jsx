import React, { use } from 'react'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/Header';
import StatsAndFilter from '@/components/StatsAndFilter';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import Footer from '@/components/Footer';
import AddTask from '@/components/AddTask';
import DateTimeFilter from '@/components/DateTimeFilter';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/Data';

const HomePage = () => {

  const [taskBuffer, settaskBuffer] = useState([]);
  const [activeTaskCount, setactiveTaskCount] = useState(0);
  const [CompleteTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setfilter] = useState('all');
  const [page, setPage] = useState(1);



  useEffect(() => {
    fetchTasks();
  }, []);

  // set page ve 1 khi filter thay doi giua cac trang thai
  useEffect(() => {
    setPage(1);
  }, [filter]) //chi chay khi filter thay doi


  // logic
  const fetchTasks = async () => {
    try {
      // const res = await api.get("/task");
      // settaskBuffer(res.data.tasks);
      // setactiveTaskCount(res.data.activeCount);
      // setCompleteTaskCount(res.data.completedCount);
      const res = await api.get("/task");
      settaskBuffer(res.data.tasks);
      const allTasks = res.data.tasks || [];
      setactiveTaskCount(allTasks.filter(t => t.status === 'active').length);
      setCompleteTaskCount(allTasks.filter(t => t.status === 'complete').length);

    } catch (error) {
      console.error('loi xay ra khi truy xuat tasks:', error);
      toast.error('khong the lay duoc tasks');
    }
  }

  const handleNext = () => {
    if (page < totalPages) {
      setPage((Prev) => Prev + 1)
    }
  }

  const handlePrev = () => {
    if (page > 1) {
      setPage((Prev) => Prev - 1)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }


  // bien
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'complete'; // đổi chỗ này
      default:
        return true;
    }
  });

  // phan trang
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  // neu xoa het task o trang hien tai thi tu dong lui ve trang truoc
  if (visibleTasks.length === 0 && page > 1) {
    setPage(page - 1);
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const handleTaskChanged = () => {
    fetchTasks();
  };

  return (

    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)
      `,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">

        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

          <Header />

          <AddTask
            handlenewTaskAdded={handleTaskChanged}
          />

          <StatsAndFilter
            filter={filter}
            setfilter={setfilter}
            activeTasksCount={activeTaskCount}
            CompleteTasksCount={CompleteTaskCount}
          />

          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            {/* <DateTimeFilter /> */}
          </div>

          <Footer
            completedTasksCount={CompleteTaskCount}
            activeTasksCount={activeTaskCount}
          />

        </div>

      </div>
    </div>




  )
}

export default HomePage