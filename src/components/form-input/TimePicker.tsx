import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface TimePickerProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

export default function TimePicker({ label, value, onChange }: TimePickerProps) {
	const [inputValue, setInputValue] = useState(value);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onChange(e.target.value);
	};

	return (
		<div>
			<Label htmlFor='timePicker'>{label}</Label>
			<Input id='timePicker' type='time' className='border border-grey-300 rounded w-full' value={inputValue} onChange={handleInputChange} />
		</div>
	);
}
