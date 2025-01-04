import {useEffect, useState} from "react";
import {CircleSlash2} from "lucide-react";

export interface ColorObj {
    id: string;
    hex: string;
    selected: boolean;
}

interface SelectColorsProps {
    colors: ColorObj[];
    previewColor?: string;
    onSelectColor: (hex: string) => void;
}

export function SelectColorsComponent({colors = [], onSelectColor, ...rest}: SelectColorsProps) {
    const NULL_COLOR_ID: string = 'null-color';
    const insertNullColor = (colors: ColorObj[]): ColorObj[] => {
        const nullColor: ColorObj = {
            hex: '#C9C8C8',
            selected: !colors.some((color) => color.selected),
            id: NULL_COLOR_ID,
        }

        if (colors.some((color) => color.id === NULL_COLOR_ID)) {
            return colors;
        }

        return [nullColor, ...colors];
    }

    const [localColors, setLocalColors] = useState<ColorObj[]>(insertNullColor(colors));

    const selectColor = (colorId: string): void => {
        const colors: ColorObj[] = localColors.map(color => ({...color, selected: color.id === colorId}));

        colors.forEach(color => {
            if (color.selected) onSelectColor(color.hex);
        })

        setLocalColors(insertNullColor(colors));
    }

    useEffect(() => {
        if (rest?.previewColor) {
            const color = localColors.find(color => color.hex === rest.previewColor);

            if (color) selectColor(color.id)
        }
    }, [])

    return (
        <ul className="flex w-full justify-between items-center">
            {localColors.map((color) => {
                if (color.selected) return (
                    <li
                        key={color.id}
                        className="border-2 border-black w-10 h-10 rounded-full p-1"
                        onClick={(): void => selectColor(color.id)}
                    >
                        <div
                            className='cursor-pointer w-full h-full rounded-full text-black'
                            style={{backgroundColor: color.hex}}
                        >
                            {color.id === NULL_COLOR_ID && <CircleSlash2 className="w-full h-full"/>}
                        </div>
                    </li>
                )
                if (!color.selected) return (
                    <li
                        key={color.id}
                        className='cursor-pointer w-8 h-8 rounded-full'
                        style={{backgroundColor: color.hex}}
                        onClick={(): void => selectColor(color.id)}
                    >
                        {color.id === NULL_COLOR_ID && <CircleSlash2 className="w-full h-full"/>}
                    </li>
                )
            })}
        </ul>
    )
}