import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface FormInputProps {
	value: string;
	id?: string;
	label: string;
	className?: string;
	onChange: (value: string) => void;
}

export default function FormInput({ value, id, label, className, onChange }: FormInputProps) {
	const [formValue, setFormValue] = useState(value);
	const formInputId = id ?? 'formInput' + Math.floor(Math.random() * 100000);

	function handleInternalChange(value: string) {
		setFormValue(value);
		onChange(value);
	}

	return (
		<div className='py-2'>
			<Label htmlFor={formInputId}>{label}</Label>
			<Input className={`border border-gray-300 rounded ${className}`} id={formInputId} value={formValue} onChange={(event) => handleInternalChange(event.target.value)} />
		</div>
	);
}
