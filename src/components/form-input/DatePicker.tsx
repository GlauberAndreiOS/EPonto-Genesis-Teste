import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { ptBR } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "../ui/label"

interface DatePicker {
	date?: Date
	id?: string
	handleSetDate: (date: Date | undefined) => void
	formatType?: string
	label?: string
	disabled?: boolean
	required?: boolean
}

export function DatePicker({
	date,
	id,
	label,
	handleSetDate,
	formatType,
	disabled,
	required,
}: DatePicker) {
	const [selectedDate, setDate] = React.useState<Date | undefined>(date)
	const datePickerId = id ?? 'datePicker' + Math.floor(Math.random() * 100000)

	function handleInternalSetDate(date: Date | undefined) {
		setDate(date)
		handleSetDate(date)
	}

	return (
		<>
			<Label htmlFor={datePickerId}>{label ?? 'Data'}</Label>
			<Popover>
				<PopoverTrigger asChild className="border border-gray-300 rounded">
					<Button
						id={datePickerId}
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, formatType ?? 'PPP', { locale: ptBR }) : <span>{label ?? 'Escolha uma data'}</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						locale={ptBR}
						className="bg-white"
						disabled={disabled}
						required={required}
						mode="single"
						selected={selectedDate}
						onSelect={handleInternalSetDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</>
	)
}