
export const ShortInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
      type="text"
      className="w-full bg-[#F6F8FA] rounded-md px-3 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder=""
      {...props}
    />
  );