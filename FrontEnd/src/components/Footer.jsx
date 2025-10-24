import React from 'react'

const Footer = ({ completedTasksCount, activeTasksCount }) => {
  // Không có task nào
  if (completedTasksCount + activeTasksCount === 0) return null;

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">
        {activeTasksCount === 0 && completedTasksCount > 0 && (
          <>🎉 Tất cả {completedTasksCount} nhiệm vụ đã hoàn thành! Xuất sắc 👏</>
        )}

        {completedTasksCount === 0 && activeTasksCount > 0 && (
          <>Hãy bắt đầu {activeTasksCount} nhiệm vụ nào!</>
        )}

        {completedTasksCount > 0 && activeTasksCount > 0 && (
          <>
            Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} nhiệm vụ
            và còn {activeTasksCount} nhiệm vụ đang chờ.
          </>
        )}
      </p>
    </div>
  )
}

export default Footer
