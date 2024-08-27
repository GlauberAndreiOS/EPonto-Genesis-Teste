import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { Label } from "../ui/label";

interface SelectInputProps {
	value: string;
	id?: string;
	label: string;
	className?: string;
	onChange: (value: string) => void;
	options: string[];
}

export default function SelectInput({ value, id, label, className, onChange, options }: SelectInputProps) {
	const [selectedValue, setSelectedValue] = useState(value);
	const selectInputId = id ?? 'selectInput' + Math.floor(Math.random() * 100000);

	function handleInternalChange(value: string) {
		setSelectedValue(value);
		onChange(value);
	}
	return (
		<div className="flex-row w-full items-center justify-center py-2">
			<Label htmlFor={selectInputId}>{label}</Label>
			<Select value={selectedValue} onValueChange={(value) => handleInternalChange(value)}>
				<SelectTrigger id={selectInputId} className={`border border-gray-300 rounded ${className}`}>
					<SelectValue placeholder={label} />
				</SelectTrigger>
				<SelectContent className="bg-white">
					{options.map((option, index) => (
						<SelectItem value={option} key={index}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}