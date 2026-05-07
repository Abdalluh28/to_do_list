import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../store/ThemeSlice";

export default function ThemeIcon() {

    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const handleThemeChange = () => {
        dispatch(toggleTheme());
    }

    return (
        <button className="inline-flex items-center justify-center gap-2 rounded-lg transition-all hover:bg-accent hover:text-accent-foreground text-sm w-10 h-10 p-0 duration-300"
            onClick={handleThemeChange}>
            {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
    )
}
