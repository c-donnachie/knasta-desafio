"use client";

import { Button, Snippet } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SIZE = 5;
const initialMatrix = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
const COLORS = ["bg-red-300", "bg-blue-300", "bg-green-300", "bg-yellow-300", "bg-purple-300"];

const MatrixScreen = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [matrix, setMatrix] = useState<number[][]>(initialMatrix);
    const [isModified, setIsModified] = useState(false);
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);

    const rotateMatrix = (direction: "90" | "-90") => {
        setMatrix((prevMatrix) => {
            const size = prevMatrix.length;
            const newMatrix = Array(size)
                .fill(0)
                .map(() => Array(size).fill(0));

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (direction === "90") {
                        newMatrix[j][size - 1 - i] = prevMatrix[i][j];
                    } else {
                        newMatrix[size - 1 - j][i] = prevMatrix[i][j];
                    }
                }
            }
            return newMatrix;
        });
    };

    const parseMatrix = (param: string | null): number[][] => {
        try {
            return param ? JSON.parse(atob(param)) : initialMatrix;
        } catch (error) {
            console.error("Error al parsear la matriz:", error);
            return initialMatrix;
        }
    };

    useEffect(() => {
        const params = searchParams.get("matrix");
        const colorParam = searchParams.get("color");
        setMatrix(parseMatrix(params));
        if (colorParam) {
            setSelectedColor(colorParam);
        }
    }, []);

    useEffect(() => {
        if (matrix.length === 0) return;
        const modified = matrix.some((row, rowIndex) =>
            row.some((cell, colIndex) => cell !== initialMatrix[rowIndex][colIndex])
        );
        setIsModified(modified);

        try {
            const encodedMatrix = btoa(JSON.stringify(matrix));
            router.replace(`?matrix=${encodedMatrix}&color=${selectedColor}`, { scroll: false });
        } catch (error) {
            console.error("Error al actualizar la URL:", error);
        }
    }, [matrix, selectedColor]);

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        setMatrix((prevMatrix) => {
            const newMatrix = prevMatrix.map((row) => [...row]);
            newMatrix[rowIndex][colIndex] = newMatrix[rowIndex][colIndex] === 0 ? 1 : 0;
            return newMatrix;
        });
    };

    const resetMatrix = () => {
        setMatrix(initialMatrix);
    };

    const handleShare = async () => {
        try {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);
        } catch (error) {
            console.error("Error al copiar la URL:", error);
        }
    };

    if (matrix.length === 0) return <p>Cargando...</p>;

    return (
        <div className="grid grid-cols-3 place-items-center gap-10">
            <section />
            <section className='flex flex-col items-center gap-4'>
                <ul className='flex flex-row gap-2'>
                    {COLORS.map((color, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedColor(color)}
                            className={`${color} ${selectedColor === color ? 'border-white border-2' : ''} h-10 w-10 rounded-md cursor-pointer flex justify-center items-center text-xl`}
                        >
                            {selectedColor === color && '✦'}
                        </li>
                    ))}
                </ul>
                <div className="grid grid-cols-5 w-64 h-64 border-black gap-1">
                    {matrix.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <motion.div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: (rowIndex * 5 + colIndex) * 0.02,
                                    ease: "easeOut",
                                }}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ease-in-out cursor-pointer ${cell ? selectedColor : ''} hover:border-red-500 hover:scale-105 hover:hue-rotate-30`}
                            />
                        ))
                    )}
                </div>
                <div className="flex gap-4">
                    <Button isIconOnly onPress={() => rotateMatrix("-90")}>🔄</Button>
                    <Button isIconOnly onPress={() => rotateMatrix("90")}>🔄</Button>
                </div>
            </section>
            <section className='flex h-full flex-col items-start justify-self-start gap-4'>
                <Button onPress={resetMatrix}>Reset</Button>
                {isModified && (
                    <Snippet tooltipProps={{ color: "foreground", content: "Copiar link", placement: "top" }} onCopy={handleShare} symbol="#" variant="bordered">
                        Compartir link
                    </Snippet>
                )}
            </section>
        </div>
    );
};

export default MatrixScreen;
