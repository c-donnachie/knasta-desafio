export const parseMatrix = (param: string | null, initialMatrix: number[][]): number[][] => {
    try {
        return param ? JSON.parse(atob(param)) : initialMatrix;
    } catch (error) {
        console.error("Error al parsear la matriz:", error);
        return initialMatrix;
    }
};
