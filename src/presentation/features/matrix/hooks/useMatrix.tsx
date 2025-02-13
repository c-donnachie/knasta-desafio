import { rotateMatrixLogic, toggleCellStateLogic } from '@/domain/useCases/matrix/matrixService';
import * as React from 'react';
import { Direction, MatrixType } from '../types/types';

export const useMatrix = (initialMatrix: MatrixType) => {

    const [matrix, setMatrix] = React.useState<MatrixType>(initialMatrix);

    const rotateMatrix = React.useCallback((direction: Direction) => {
        setMatrix(prevMatrix => rotateMatrixLogic(prevMatrix, direction));
    }, []);

    const handleCellClick = React.useCallback((rowIndex: number, colIndex: number) => {
        setMatrix(prevMatrix => toggleCellStateLogic(prevMatrix, rowIndex, colIndex));
    }, []);

    const resetMatrix = React.useCallback(() => {
        setMatrix(initialMatrix);
    }, [initialMatrix]);

    return {
        matrix,
        setMatrix,
        rotateMatrix,
        handleCellClick,
        resetMatrix,
    };
};
