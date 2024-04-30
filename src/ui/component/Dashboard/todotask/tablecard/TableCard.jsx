import TableCardItem from "./TableCardItem";

export default function TableCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
      <div className="flex flex-col gap-8">
        <div className="px-12 py-8 flex flex-row justify-between items-center w-full bg-red-bg rounded-main">
          <p className="text-sm text-red-text">Must Have</p>
        </div>
        <TableCardItem />
      </div>
      <div className="flex flex-col gap-8">
        <div className="px-12 py-8 flex flex-row justify-between items-center w-full bg-blue-bg rounded-main">
          <p className="text-sm text-blue-text">Should Have</p>
        </div>
        <TableCardItem />
        <TableCardItem />
        <TableCardItem />
      </div>
      <div className="flex flex-col gap-8">
        <div className="px-12 py-8 flex flex-row justify-between items-center w-full bg-green-bg rounded-main">
          <p className="text-sm text-green-text">Could Have</p>
        </div>
        <TableCardItem />
        <TableCardItem />
      </div>
      <div className="flex flex-col gap-8">
        <div className="px-12 py-8 flex flex-row justify-between items-center w-full bg-input-border rounded-main">
          <p className="text-sm text-light">Won&apos;t Have</p>
        </div>
        <TableCardItem />
      </div>
    </div>
  );
}
