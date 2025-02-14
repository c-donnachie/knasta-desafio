import { Tooltip } from '@/presentation/components/Tooltip';
import { Button } from '@heroui/react';
import { Direction } from '../types/types';

interface RotationButtonsProps {
    rotateMatrix: (direction: Direction) => void
};

export const RotationButtons: React.FC<RotationButtonsProps> = ({ rotateMatrix }) => {
    return (
        <div className="flex gap-4">


            <Tooltip
                label='Left'
            >
                <Button
                    className='scale-x-100'
                    isIconOnly onPress={() => rotateMatrix("-90")}>
                    <p className="text-3xl">🔄</p>
                </Button>
            </Tooltip>

            <Tooltip
                label='Right'
            >
                <Button
                    isIconOnly onPress={() => rotateMatrix("90")}>
                    <p className="text-3xl scale-x-[-1]">🔄</p>
                </Button>
            </Tooltip>

        </div>
    )
}
