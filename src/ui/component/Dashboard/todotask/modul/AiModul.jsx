import { toggleAi } from "@/redux/features/AiSlice/AiSlice";
import { useAppSelector } from "@/redux/store";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import TextInputWithoutBg from "@/ui/block/input/TextInput/TextInputWithoutBg";
import {
  DocumentPlusIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export default function AiModul() {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(toggleAi());
  };
  const AiValue = useAppSelector((state) => state.askai.askai);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({});

  return AiValue ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-50 p-32">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-40"
        onClick={onClose}
      ></div>
      <motion.div
        className="fixed top-[20%] lg:w-[100%] w-[50%] 2xl:w-[40%] bg-input-bg dark:bg-primary z-50 rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-row justify-between px-8 py-4"
        initial={{ scale: 0, rotate: "8.5deg" }}
        animate={{ scale: 1, rotate: "0deg" }}
        exit={{ scale: 0, rotate: "0deg" }}
      >
        <div className="flex flex-row gap-8 items-center">
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
        </div>
        <motion.button
          className="px-8 bg-white dark:bg-primary dark:border-dark-input-border border border-input-border rounded-main h-40 w-40 flex items-center justify-center cursor-pointer"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <PaperAirplaneIcon className="w-[24px] h-[24px] text-input-bg" />
        </motion.button>
      </motion.div>
    </div>
  ) : null;
  <div></div>;
}
