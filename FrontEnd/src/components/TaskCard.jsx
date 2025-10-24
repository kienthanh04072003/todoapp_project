import { Car, Check, CheckCircle, CheckCircle2, Circle, Calendar, SquarePen, Trash2 } from 'lucide-react';
import React, { use, useState } from 'react'
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '../lib/utils';
import api from '@/lib/axios';
import { toast } from 'sonner';



const TaskCard = ({ task, index, handleTaskChanged }) => {

    // let isEditing = false;

    const [isEditting, setIsEditting] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/task/${taskId}`);
            toast.success("task da bi xoa");
            handleTaskChanged();
        } catch (error) {
            console.error("khong the xoa task", error);
            toast.error("ban khong the xoa task nay")
        }
    }

    const updateTask = async () => {
        try {
            setIsEditting(false);
            await api.put(`/task/${task._id}`, { title: updateTaskTitle });
            toast.success(`nhiem vu d doi thanh ${updateTaskTitle}`)
            handleTaskChanged();
        } catch (error) {
            console.error("khong the cap nhat task", error)
            toast.error("xay ra loi khi cap nhat vui long kiem tra lai")
        }
    }

    const toggleTaskCompleteButton = async () => {
        try {
            if (task.status === 'active') {
                // cap nhat task id do tro ve trang thai complete. (status: 'complete') la dua trang thai status ve complete 
                await api.put(`/task/${task._id}`, { status: 'complete', completedAt: new Date().toISOString() });
                toast.success(`nhiem vu ${task.title} da hoan thanh`)
                handleTaskChanged();
            } else if (task.status === 'complete') {
                // cap nhat task id do tro ve trang thai active 
                await api.put(`/task/${task._id}`, { status: 'active', completedAt: null });
                toast.success(`nhiem vu ${task.title} da duoc khoi phuc`)
                handleTaskChanged();
            }
        } catch (error) {
            console.error("khong the cap nhat trang thai task", error);
            toast.error("khong the cap nhat trang thai task")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateTask();
        }
    }

    return (
        <Card
            className={cn(
                "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
                task.status === 'complete' && 'opacity-75'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
        >

            <div className="flex items-center gap-4">
                {/* nut tron hoan thanh task */}
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === 'complete'
                            ? "text-success hover:text-success/80"
                            : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskCompleteButton}
                >
                    {task.status === 'complete' ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </Button>

                {/* hien thi hoac chinh sua tieu de */}
                <div className="flex-1 min-w-0">
                    {isEditting ? (
                        <Input
                            placeholder="can phai lam gi? "
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/20 focus:ring-primary/20"
                            type="text"
                            value={updateTaskTitle}
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditting(false);  // khi nguoi dung bam ra ngoai pham phi cua input thi huy trang thai nhap
                                setUpdateTaskTitle(task.title || ""); // reset lai tieu de neu khong luu
                            }}
                        ></Input>
                    ) : (
                        <p
                            className={cn(
                                "text-base transition-all duration-200",
                                task.status === "complete"
                                    ? "line-through text-muted-foreground"
                                    : "text-foreground"
                            )}
                        >
                            {task.title}
                        </p>

                    )}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground"> - </span>
                                <Calendar className="size-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* ngay tao va ngay hoan thanh */}


                {/* nut chinh va nut xoa */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/* nút edit */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditting(true);
                            setUpdateTaskTitle(task.title || "")
                        }
                        }
                    >
                        <SquarePen className="size-4" />
                    </Button>

                    {/* nút xoá */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>


            </div>

        </Card>
    )
}

export default TaskCard