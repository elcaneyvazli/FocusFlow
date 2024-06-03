import Tab from "@/ui/block/Tab/Tab";
import NewTaskModul from "@/ui/component/Dashboard/todotask/modul/newTaskModul";
import Taskcard from "@/ui/component/Dashboard/todotask/taskcard/taskcard";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const theme = cookieStore.get("access_token");
  console.log(theme);

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        <Taskcard />
      </div>
      <Tab />
      <NewTaskModul />
    </div>
  );
}
