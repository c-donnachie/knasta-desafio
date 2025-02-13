import { motion } from "framer-motion";
import { PaletteColorsProps } from "../types/PaletteColorsProps";

export const PaletteColors: React.FC<PaletteColorsProps> = ({ colors, selectedColor, setSelectedColor }) => {
    return (
        <ul className='relative flex flex-row gap-2'>
            {colors.map((color, index) => (
                <li
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`relative h-10 w-10 rounded-md cursor-pointer flex justify-center items-center text-xl 
                        ${color} hover:scale-105 transition-transform duration-150 ease-in`}
                >
                    {selectedColor === color && '✦'}

                    {/* Indicador animado */}
                    {selectedColor === color && (
                        <motion.div
                            layoutId="indicator"
                            className="absolute inset-0 border-white border-2 rounded-md"
                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        />
                    )}
                </li>
            ))}
        </ul>
    )
};
