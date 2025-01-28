import Avvvatars from "avvvatars-react";
import React from "react";

export default function GroupMember({ member }) {
  return (
    <div className="flex flex-row gap-8 w-full ">
      <Avvvatars size={32} value={member.username} />
      <div className="flex flex-col gap-4">
        <p className="text-light text-xs leading-none">{member.roleName}</p>
        <p className="text-text text-md leading-none">{member.username}</p>
      </div>
    </div>
  );
}
