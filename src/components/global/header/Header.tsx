import { useUserContext } from "@/Providers/UserProvider"
import ModeToggle from "@/components/global/header/ThemeToggle"

export default function Header() {
	const user = useUserContext();

	return (
		<header className="h-[100px] w-[100%] flex flex-col columns-12 container mx-auto px-[31px] items-start justify-center bg-[#1262B3]">
			<p className="font-montserrat text-white text-xl">Bem vindo, {user.name}</p>
			<ModeToggle />
		</header>
	)
}