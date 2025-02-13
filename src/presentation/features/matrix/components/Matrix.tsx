import { motion } from 'framer-motion';
import React from 'react';
import { MatrixType } from '../types/types';

interface MatrixProps {
    matrix: MatrixType
    handleCellClick: (rowIndex: number, colIndex: number) => void;
    selectedColor: string;
};

export const Matrix = React.memo(({ matrix, handleCellClick, selectedColor }: MatrixProps) => {
    return (
        <ul className="grid grid-cols-5 w-64 h-64 border-black gap-1">
            {matrix.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <motion.li
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: (rowIndex * 5 + colIndex) * 0.05,
                            ease: "easeOut",
                        }}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ease-in-out cursor-pointer ${cell ? selectedColor : ''} hover:border-red-500 hover:scale-105 hover:hue-rotate-30`}
                    />
                ))
            )}
        </ul>
    )
});
