import { useContext } from "react"
import {ThemeContext} from "../context/theme/ThemeContext"

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("Use Theme must be used within a Theme Provider")
  }
  return context
}
