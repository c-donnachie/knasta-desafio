import { Button } from '@heroui/react';
import { Direction } from '../types/types';


interface RotationButtonsProps {
    rotateMatrix: (direction: Direction) => void
};

export const RotationButtons: React.FC<RotationButtonsProps> = ({ rotateMatrix }) => {
    return (
        <div className="flex gap-4">
            <Button isIconOnly onPress={() => rotateMatrix("-90")}>🔄</Button>
            <Button isIconOnly onPress={() => rotateMatrix("90")}>🔄</Button>
        </div>
    )
}
