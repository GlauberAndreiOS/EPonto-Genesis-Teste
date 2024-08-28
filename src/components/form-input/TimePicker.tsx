import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useTheme } from '@/Providers/ThemeProvider';

interface TimePickerProps {
	label?: string;
	id?: string;
	value: string | any;
	className?: string;
	onChange?: (value: string) => void;
}

export default function TimePicker({ label, id, value, className, onChange }: TimePickerProps) {
	const [inputValue, setInputValue] = useState(value);
	const timePickerId = id ?? 'datePicker' + Math.floor(Math.random() * 100000)

	className = className ? className : 'border border-grey-300 rounded w-full justify-evenly'

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		if (onChange)
			onChange(e.target.value);
	};

	return (
		<div>
			{
				label ?
					<Label htmlFor={timePickerId}>{label}</Label> :
					<></>
			}
			<Input id={timePickerId} type='time' className={`${className}`} value={inputValue} onChange={handleInputChange} />
		</div>
	);
}
