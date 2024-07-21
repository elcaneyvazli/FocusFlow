import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAi } from "@/redux/features/AiSlice/AiSlice";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import TextInputWithoutBg from "@/ui/block/input/TextInput/TextInputWithoutBg";
import KanbanAiBoard from "./KanbanAi/KanbanAiBoard";
import KanbanBoardSkeleton from "../kanbancard/KanbanBoardSkeleton";
import Button from "@/ui/block/button/Button/Button";
import axios from "axios";

export default function AiModul() {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(toggleAi());
  };
  const AiValue = useSelector((state) => state.askai.askai);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    setTaskTitle(data.taskTitle);
    setLoading(true);
    await sendRequest(data.taskTitle);
    setLoading(false);
  };

  const aiUrl = process.env.NEXT_PUBLIC_API_KEY_Gemini_AI;

  const sendRequest = useCallback(
    async (text) => {
      try {
        const response = await axios.post(
          `${aiUrl}`,
          { text },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = response.data;
        setTasks(result.tasks);
        console.log("API Response:", result);
        console.log("Tasks:", tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [setTasks, tasks]
  );

  const extractTasks = (data) => {
    return data.reduce((acc, obj) => {
      if (obj.items) {
        obj.items.forEach((item) => {
          acc.push(item);
        });
      }
      return acc;
    }, []);
  };

  const taskslist = extractTasks(tasks);

  const baseUrl = process.env.NEXT_PUBLIC_API_KEY;
  const sendTaskList = async (tasksList) => {
    try {
      const response = await axios.post(`${baseUrl}/UserTask/list`, tasksList, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending task list:", error);
      throw error;
    }
  };

  const handleConfirm = async () => {
    try {
      await sendTaskList(taskslist);
      console.log("Tasks successfully sent to the server");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error sending tasks to the server:", error);
    }
  };

  return AiValue ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-50 px-4 py-16 md:px-32 md:py-16">
      <div className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-90 z-40"></div>
      <div className="flex flex-col gap-16 w-full items-center z-50">
        <div
          className="z-50 w-full flex items justify-end px-4 md:px-64"
          onClick={onClose}
        >
          <XMarkIcon className="w-[32px] h-[32px] text-white cursor-pointer z-50" />
        </div>
        <motion.div
          className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[50%] 2xl:max-w-[40%] bg-input-bg dark:bg-primary z-50 rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-row justify-between px-8 py-4"
          initial={{ scale: 0, rotate: "8.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row gap-8 items-center justify-between w-full"
          >
            <SparklesIcon className="w-[24px] h-[24px] text-primary dark:text-input-bg" />
            <TextInputWithoutBg
              title="Task title"
              placeholder="Add Task Title"
              text="md"
              color="primary"
              darkcolor="input-bg"
              register={register}
              registername="taskTitle"
              error={errors.taskTitle?.message}
            />
            <motion.button
              type="submit"
              className="px-8 bg-white dark:bg-primary dark:border-dark-input-border border border-input-border rounded-main h-40 w-40 flex items-center justify-center cursor-pointer"
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <PaperAirplaneIcon className="w-[24px] h-[24px] text-input-bg" />
            </motion.button>
          </form>
        </motion.div>
        {loading ? (
          <div className="w-full px-4 md:px-32">
            <KanbanBoardSkeleton />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col relative">
            <div className="w-full px-4 md:px-32 h-full overflow-auto pb-64 z-40">
              <KanbanAiBoard columns={tasks} />
            </div>
            <div className="w-full flex flex-row gap-4 md:gap-16 pb-4 fixed bottom-0 left-0 right-0 px-4 md:px-32 z-50">
              <Button onClick={onClose} text="Cancel" width="full" />
              <Button text="Confirm" width="full" color="green" onClick={handleConfirm} />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
}