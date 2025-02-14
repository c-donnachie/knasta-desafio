
// todo: mejorar tipado
export const generateRandomMatrix = (size: number): number[][] => {
    const matrix = Array(size).fill(null).map(() => Array(size).fill(0));

    let filledCells = 0;
    while (filledCells < 6) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (matrix[row][col] === 0) {
            matrix[row][col] = Math.floor(Math.random() * 5) + 1;
            filledCells++;
        }
    }
    return matrix;
};