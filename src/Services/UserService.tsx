import { api } from "@/axios.config"

export async function getUsers(): Promise<any> {
	return await api.get('/users')
}

export async function getUserById(id: number): Promise<any> {
	return await api.get(`/user/${id}`)
}