import React from 'react'

const Header = () => {
    return (
        <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
                ToDo App
            </h1>
            <p className="text-muted-foreground font-bold">
                Quản lý công việc hiệu quả và luôn ngăn nắp!
            </p>
        </div>
    )
}

export default Header