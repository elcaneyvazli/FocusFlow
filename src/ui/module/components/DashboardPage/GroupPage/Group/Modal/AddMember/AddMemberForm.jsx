import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react"; // Add useState import
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import { User } from "lucide-react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setToggleNewMember } from "@/redux/features/GroupSlice/GroupSlice";
import { useParams } from "next/navigation";
import { addGroupMember, useGroupMember } from "@/services/group.services";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice"; // Add this import

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required("Username or email is required"),
});

export default function AddMemberForm() {
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { mutate } = useGroupMember(id);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await addGroupMember(id, data.usernameOrEmail, mutate);
      dispatch(
        addToast({
          id: Date.now(),
          title: "Success",
          message: "Member added successfully",
          variant: "success",
        })
      );
      dispatch(setToggleNewMember());
    } catch (err) {
      dispatch(
        addToast({
          id: Date.now(),
          title: err?.title,
          message: err?.desc,
          variant: "error",
        })
      );
      setError(err?.errors?.usernameOrEmail?.[0]);
      console.error(err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleSubmit, onSubmit]);

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-[40%] md:top-64 w-[100%] md:w-[90%] lg:w-[65%] h-[60%] md:h-fit bg-background z-50 rounded-t-md md:rounded-md border border-border shadow-lg flex flex-col md:justify-normal justify-between"
      initial={{ scale: 0, rotate: "8.5deg" }}
      animate={{ scale: 1, rotate: "0deg" }}
    >
      <div className="p-12 flex flex-col gap-12">
        <Input
          icon={<User size={16} className="text-text" />}
          placeholder="Username or email"
          title="User Name or email"
          registername="usernameOrEmail"
          error={errors.usernameOrEmail?.message}
          register={register}
          required={true}
        />
      </div>

      <div className="flex flex-row items-center justify-between p-12 border-t border-border">
        <Button
          type="base"
          text="Cancel"
          onClick={() => dispatch(setToggleNewMember())}
        />
        <Button type="primary" text="Add Member" />
      </div>
    </motion.form>
  );
}
