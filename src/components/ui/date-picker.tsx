import {format} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";

import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {useState} from "react";
import {Button} from "../ui/button";
import {Calendar} from "../ui/calendar";

interface DatePickerCommonProps {
    label?: string;
    onSelect: (date: Date) => void;
}

export function DatePicker(props: DatePickerCommonProps) {
    const {label, onSelect} = props;
    const [date, setDate] = useState<Date>(new Date());

    const emitDate = (selectedDate: any): void => {
        setDate(selectedDate);
        onSelect(selectedDate);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {date ? format(date, "PPP") : <span>{label ? label : 'Selecione uma data'}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={emitDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}