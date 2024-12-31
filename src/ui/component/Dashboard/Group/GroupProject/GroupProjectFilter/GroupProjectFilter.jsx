import React from "react";
import TextInput from "@/ui/block/input/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowRightCircleIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import useScreenWidth from "@/utils/useScreenWidth";
import PrimaryButton from "@/ui/block/button/Button/PrimaryButton";
import { useDispatch } from "react-redux";
import { toggleAddProjectModal } from "@/redux/features/GroupSlice/GroupSlice";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GroupProjectFilter() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(),
  });

  const isScreenSmall = useScreenWidth(768);

  const toggleModal = () => {
    dispatch(toggleAddProjectModal());
  };

  return (
    <div className="col-span-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-16">
        <PrimaryButton
          onClick={() => router.push(`/dashboard/group`)}
          variant="icon-primary"
          icon={
            <ArrowLeftCircleIcon className="w-[18px] h-[18px] text-primary dark:text-input-bg" />
          }
        />
        <TextInput
          placeholder="Search"
          icon={
            <MagnifyingGlassIcon className="w-[18px] h-[18px] text-light" />
          }
          registername="search"
          error={errors.search?.message}
          register={register}
        />
        <PrimaryButton
          text="Add Project"
          width={isScreenSmall ? "full" : "fit"}
          onClick={toggleModal}
          variant="primary"
        />
      </div>
    </div>
  );
}
