export const handleShareUrl = async () => {
    try {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
    } catch (error) {
        console.error("Error al copiar la URL:", error);
    }
};