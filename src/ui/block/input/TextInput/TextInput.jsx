export default function TextInput({ title, placeholder, icon }) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-sm font-medium">{title}</h1>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
          {icon}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="bg-[#f9fafb] border border-[#D1D5DB] text-gray-900 text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-12"
        />
      </div>
    </div>
  );
}
