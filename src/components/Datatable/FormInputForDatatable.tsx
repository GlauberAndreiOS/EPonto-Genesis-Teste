import { useState } from 'react';
import { Input } from '../ui/input';

interface FormInputForDatatableProps {
	value: any;
	id?: string;
	className?: string;
	onChange?: (value: string) => void;
}

export default function FormInputForDatatable({ value, id, className, onChange }: FormInputForDatatableProps) {
	const [inputValue, setInputValue] = useState(value);
	const formInputId = id ?? 'formInput' + Math.floor(Math.random() * 100000);

	function handleInternalChange(value: string) {
		const numericValue = value.replace(/\D/g, '');
		if (numericValue.length === 4) {
			setInputValue(`${numericValue.slice(0,2)}:${numericValue.slice(2,4)}`)
		} else if (numericValue.length === 8) {
			setInputValue(`${numericValue.slice(0,2)}/${numericValue.slice(2,4)}/${numericValue.slice(4,8)}`);
		} else {
			setInputValue(value)
		}
	}

	return (
		<Input
			id={formInputId} value={inputValue}
			className={`border border-gray-300 rounded ${className}`}
			onChange={(event) => handleInternalChange(event.target.value)}
		/>
	);
}
