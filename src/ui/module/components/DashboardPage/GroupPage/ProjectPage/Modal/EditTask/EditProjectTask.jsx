// import { setToggleProjectTask } from "@/redux/features/ProjectSlice/ProjectSlice";
// import { useAppSelector } from "@/redux/store";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import NewProjectTaskForm from "./EditProjectTaskForm";
// import { useProjectById } from "@/services/project.services";
// import { useParams } from "next/navigation";

// export default function EditProjectTask() {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const newProjectTask = useAppSelector((state) => state.project.editProjectTask);

//   const groupId = params?.id?.toString();
//   const projectId = params?.slug?.[0]?.toString();

//   const { project, isLoading, isError, mutate: projectMutate } = useProjectById(
//     groupId,
//     projectId
//   );


//   const onClose = () => {
//     projectMutate();
//     dispatch(setToggleProjectTask());
//   };

//   if (isLoading || !project) {
//     return null;
//   }

//   return (
//     newProjectTask && (
//       <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-[100]">
//         <motion.div
//           className="fixed inset-0 bg-black bg-opacity-20 z-40 backdrop-blur-sm"
//           onClick={onClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//         ></motion.div>
//         <NewProjectTaskForm 
//           onClose={onClose} 
//           project={project}
//           groupId={groupId}
//           projectId={projectId}
//           mutate={projectMutate}
//         />
//       </div>
//     )
//   );
// }
