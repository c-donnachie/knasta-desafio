import { ReactNode } from "react";

interface TooltipProps {
    children: ReactNode;
    label: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, label }) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-max flex flex-col items-center opacity-0 group-hover:opacity-100 transition">
                <span className="bg-gray-900 text-white text-sm px-3 py-1 rounded">
                    {label}
                </span>
                <div className="w-2 h-2 bg-gray-900 rotate-45 mt-[-5px]"></div>
            </div>
        </div>
    );
};
