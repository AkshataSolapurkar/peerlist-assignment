 export const LongInput: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea
      className="w-full min-h-[100px] bg-[#F6F8FA] rounded-md px-3 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder=""
      {...props}
    />
  );