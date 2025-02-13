import { Button, Snippet } from '@heroui/react';
import { CardOptionsProps } from '../types/CardOptionsProps.types';

export const CardOptions: React.FC<CardOptionsProps> = ({ resetMatrix, isModified, handleShareUrl }) => {
    return (
        <>
            <Button onPress={resetMatrix}>Reset</Button>
            {isModified && (
                <Snippet
                    tooltipProps={{
                        color: "foreground",
                        content: "Copiar link",
                        placement: "top",
                    }}
                    onCopy={handleShareUrl}
                    symbol="#"
                    variant="bordered"
                >
                    Compartir link
                </Snippet>
            )}
        </>
    )
};
