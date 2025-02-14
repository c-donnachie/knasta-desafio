import { Button } from '@heroui/react';
import { Direction } from '../types/types';


interface RotationButtonsProps {
    rotateMatrix: (direction: Direction) => void
};

export const RotationButtons: React.FC<RotationButtonsProps> = ({ rotateMatrix }) => {
    return (
        <div className="flex gap-4">
            <Button
                className='scale-x-100'
                isIconOnly onPress={() => rotateMatrix("-90")}>
                <p className="text-3xl">🔄</p>
            </Button>
            <Button

                isIconOnly onPress={() => rotateMatrix("90")}>
                <p className="text-3xl scale-x-[-1]">🔄</p>
            </Button>
        </div>
    )
}
