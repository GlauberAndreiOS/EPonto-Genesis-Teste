import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/Providers/ThemeProvider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ModeToggle() {
	const { setTheme, theme } = useTheme()

	const [darkMode, setDarkMode] = useState(theme === 'dark')

	const handleSetTheme = (event: boolean) => {
		setTheme(event ? 'dark' : 'light')
		setDarkMode(event)
	}

	return (
		<div className="absolute right-0 mr-4 flex flex-row gap-2">
			<Switch className="border-white color-white hidden" id="theme-toggle" checked={darkMode} onCheckedChange={(event) => handleSetTheme(event)}/>
			<Label htmlFor="theme-toggle">
				<Moon size={24} color="white" className={theme === "dark" ? 'hidden' : ''} />
				<Sun size={24} color="white" className={theme === "light" ? 'hidden' : ''} />
			</Label>
		</div>
	)
}