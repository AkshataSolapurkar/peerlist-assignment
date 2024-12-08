import { Link2 } from "lucide-react";
export const UrlInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <div className="relative">
      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="url"
        className="w-full bg-[#F6F8FA] rounded-md pl-9 pr-3 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Link to your best work"
        {...props}
      />
    </div>
  );