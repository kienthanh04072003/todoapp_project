import React, { use } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import api from '@/lib/axios'
import { toast } from 'sonner'

const AddTask = ({ handlenewTaskAdded }) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () => {
        if (newTaskTitle.trim() !== "") {
            try {
                await api.post('/task', { title: newTaskTitle, });
                toast.success(`nhiệm vụ ${newTaskTitle} đã được thêm vào`);
                setNewTaskTitle("");
                handlenewTaskAdded();
            } catch (error) {
                console.error("không thể tạo nhiệm vụ mới", error);
                toast.error("bạn không thể tạo nhiệm vụ")
                return;
            }

            setNewTaskTitle("");
        } else {
            toast.error("bạn cần cập nhật nhiệm vụ")
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    type="text"
                    placeholder="cần phải làm gì?"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/2"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={addTask}
                    disabled={newTaskTitle.trim() === ""}
                >
                    <Plus className="size-5" />
                    Add Task
                </Button>
            </div>
        </Card>
    )
}

export default AddTask