export default function TextInputWithoutBg({
  placeholder,
  error,
  registername,
  register,
  value,
  color,
  text,
  darkcolor,
}) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <input
        type="text"
        placeholder={placeholder}
        className={`focus:ring-none focus:border-none focus:outline-none  bg-transparent text-${text} font-normal text-${color} dark:text-${darkcolor} w-full`}
        {...register(registername)}
      />
      {error && <p className="text-red-bg text-sm">{error}</p>}
    </div>
  );
}