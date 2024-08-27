import { getUserById } from "@/Services/UserService"
import { AxiosResponse } from "axios"
import { createContext, useContext } from "react"

interface User {
	id: number,
	name: string,
	age: number
}

export const UserContext = createContext<AxiosResponse>(await getUserById(1))

export function useUserContext() {
	const response = useContext(UserContext)

	if (response === undefined) {
		throw new Error('Usuário não encontrado')
	}

	const user = response.data as User

	return user;
}