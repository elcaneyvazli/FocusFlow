import TextInput from "@/ui/block/input/TextInput/TextInput";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "@/ui/block/button/Button/Button";
import useScreenWidth from "@/utils/useScreenWidth";
import PrimaryButton from "@/ui/block/button/Button/PrimaryButton";

export default function GroupFilter({ modal, toggleModal }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(),
  });

  const isScreenSmall = useScreenWidth(768);

  console.log(modal);

  return (
    <div className="col-span-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-16">
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
          text="Add Group"
          width={isScreenSmall ? "full" : "fit"}
          onClick={toggleModal}
          variant="primary"
        />
      </div>
    </div>
  );
}
