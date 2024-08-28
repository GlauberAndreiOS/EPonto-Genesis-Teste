import { createContext, useContext, useEffect, useState } from "react"

interface Mensagem {
	text: string,
	type: "erro" | "sucesso" | ""
}

export const messageContext = createContext<any>({ text: "", type: "" })

export const useMessage = () => {
	const context = useContext<any>(messageContext)

	return context
}

export function MensagemProvider({ children }: any) {
	const [message, setMessage] = useState<Mensagem>({} as Mensagem)

	return (
		<messageContext.Provider value={{ message, setMessage }}>
			{ children }
		</messageContext.Provider>
	)
}

export default function Mensagem() {
	const {message} = useMessage()

	const [bgColor, setBgColor] = useState<string>(message.type === 'erro' ? 'bg-red-200' : message.type === 'sucesso' ? 'bg-green-200' : '')

	useEffect(() => {
		setBgColor(message.type === 'erro' ? 'bg-red-200' : message.type === 'sucesso' ? 'bg-green-200' : '')
	}, [message])

	if (!message.text)
		return <div></div>

	return (
		<div className={`h-[80px] mx-[34px] mt-[38px] mb-4 flex items-center ${bgColor} shadow-lg`}>
			<p className='text-[#1262B3] font-montserrat text-xl font-bold px-[34px] py-4'>{message.text}</p>
		</div>
	)
}