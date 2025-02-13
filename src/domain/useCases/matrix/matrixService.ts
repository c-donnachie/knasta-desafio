import { Direction, MatrixType } from "@/presentation/features/matrix/types/types";

export const rotateMatrixLogic = (matrix: MatrixType, direction: Direction): MatrixType => {
    const size = matrix.length;
    const newMatrix: MatrixType = Array(size)
        .fill(0)
        .map(() => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (direction === "90") {
                newMatrix[j][size - 1 - i] = matrix[i][j];
            } else {
                newMatrix[size - 1 - j][i] = matrix[i][j];
            }
        }
    }
    return newMatrix;
};

export const toggleCellStateLogic = (
    matrix: MatrixType,
    rowIndex: number,
    colIndex: number
): MatrixType => {
    return matrix.map((row, i) =>
        row.map((cell, j) => (i === rowIndex && j === colIndex ? (cell === 0 ? 1 : 0) : cell))
    );
};
