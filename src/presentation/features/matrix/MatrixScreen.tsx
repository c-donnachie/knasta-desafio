"use client";

import { handleShareUrl } from '@/presentation/utils/handleShareParams';
import { Button } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { CardOptions } from './components/CardOptions';
import { Matrix } from './components/Matrix';
import { PaletteColors } from './components/PaletteColors';
import { RotationButtons } from './components/RotationButtons';
import { useMatrix } from './hooks/useMatrix';
import { generateRandomMatrix } from './utils/generaterandomMatrix';
import { parseMatrix } from './utils/parseMatrix.';

const SIZE = 5;
const initialMatrix = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
const COLORS = ["bg-red-300", "bg-blue-300", "bg-green-300", "bg-yellow-300", "bg-purple-300"];

const MatrixScreen = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isModified, setIsModified] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);

    const { matrix, setMatrix, rotateMatrix, handleCellClick, resetMatrix } = useMatrix(initialMatrix);

    // ref para evitar actualizaciones innecesarias en la URL
    const lastUrlState = React.useRef<string | null>(null);


    // todo: sacar de aca y agregar useCallback
    const handleGenerateButton = () => {
        const newMatrix = generateRandomMatrix(SIZE);
        setMatrix(newMatrix);
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                rotateMatrix('90');
            }, i * 100);
        }
    };

    React.useEffect(() => {
        const params = searchParams.get("matrix");
        const colorParam = searchParams.get("color");

        const newMatrix = parseMatrix(params, initialMatrix);
        setMatrix(newMatrix);

        if (colorParam && COLORS.includes(colorParam)) {
            setSelectedColor(colorParam);
        }
    }, [searchParams]);

    React.useEffect(() => {
        if (matrix.length === 0) return;

        // Determinar si la matriz fue modificada
        const modified = matrix.some((row, rowIndex) =>
            row.some((cell, colIndex) => cell !== initialMatrix[rowIndex][colIndex])
        );
        if (modified !== isModified) {
            setIsModified(modified);
        }

        // Codifica la matriz y color a la url
        try {
            const encodedMatrix = btoa(JSON.stringify(matrix));
            const newUrl = `?matrix=${encodedMatrix}&color=${selectedColor}`;

            if (lastUrlState.current !== newUrl) {
                lastUrlState.current = newUrl;
                router.replace(newUrl, { scroll: false });
            }
        } catch (error) {
            console.error("Error al actualizar la URL:", error);
        }
    }, [matrix, selectedColor]);

    if (matrix.length === 0) return <p>Cargando...</p>;

    return (
        <div className="grid grid-cols-3 place-items-center gap-10">

            {/* todo: llevar a un componente */}
            <section >
                <Button
                    onPress={handleGenerateButton}
                >
                    Random 🎲
                </Button>
            </section>

            <section className='flex flex-col items-center gap-4'>
                <PaletteColors
                    colors={COLORS}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
                <Matrix
                    matrix={matrix}
                    handleCellClick={handleCellClick}
                    selectedColor={selectedColor}
                />
                <RotationButtons rotateMatrix={rotateMatrix} />
            </section>
            <section className='flex h-full flex-col items-start justify-self-start gap-4'>
                <CardOptions
                    resetMatrix={resetMatrix}
                    isModified={isModified}
                    handleShareUrl={handleShareUrl}
                />
            </section>
        </div>
    );
};

export default MatrixScreen;
