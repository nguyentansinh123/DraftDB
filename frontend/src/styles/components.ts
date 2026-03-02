import { clsx } from "clsx";

// Design tokens - centralized color and spacing definitions
export const tokens = {
  colors: {
    primary: {
      main: "green-600",
      hover: "green-700",
      light: "green-50",
      dark: "green-400",
    },
    secondary: {
      main: "cyan-600", 
      hover: "cyan-700",
      light: "cyan-50",
      dark: "cyan-400",
    },
    neutral: {
      text: "neutral-700 dark:text-neutral-200",
      textMuted: "neutral-600 dark:text-neutral-300", 
      border: "neutral-200/20 dark:border-neutral-800/20",
    }
  },
  spacing: {
    buttonPadding: "px-4 py-2",
    iconPadding: "px-3 py-2",
  },
  borderRadius: {
    button: "rounded-lg",
    card: "rounded-xl",
  },
  transitions: {
    default: "transition-all duration-200 ease-out",
    fast: "transition-colors duration-150",
  }
};

// Reusable component patterns
export const components = {
  // Button variants
  button: {
    base: clsx(
      "inline-flex items-center justify-center font-medium",
      "outline-none",
      tokens.transitions.default,
    ),
    
    // Size variants  
    sizes: {
      sm: "h-8 px-3 text-sm",
      md: "h-9 px-4 text-sm", 
      lg: "h-10 px-5 text-base",
      icon: "w-9 h-9",
    },

    // Style variants
    variants: {
      primary: clsx(
        tokens.borderRadius.button,
        "bg-gradient-to-r from-green-600 to-cyan-600 text-white",
        "hover:from-green-700 hover:to-cyan-700", 
        "shadow-lg hover:shadow-green-500/25 hover:scale-105",
      ),
      
      ghost: clsx(
        tokens.borderRadius.button,
        "text-neutral-600 dark:text-neutral-300",
        "hover:text-green-700 dark:hover:text-green-400",
        "hover:bg-green-50 dark:hover:bg-green-900/20",
        "border border-transparent hover:border-green-200 dark:hover:border-green-800",
      ),

      outline: clsx(
        tokens.borderRadius.button,
        "border border-green-200 dark:border-green-800",
        "text-green-700 dark:text-green-400",
        "hover:bg-green-50 dark:hover:bg-green-900/20",
      ),
    }
  },

  // Navigation link styles
  navLink: {
    base: clsx(
      "group flex items-center gap-2 font-medium",
      tokens.borderRadius.button,
      tokens.transitions.default,
    ),
    
    variants: {
      default: clsx(
        "px-4 py-2 text-sm",
        "text-neutral-700 dark:text-neutral-200",
        "hover:text-green-700 dark:hover:text-green-400",
        "hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50",
        "dark:hover:from-green-900/20 dark:hover:to-cyan-900/20",
      ),
      
      mobile: clsx(
        "px-4 py-3 text-sm",
        "text-neutral-700 dark:text-neutral-200", 
        "hover:text-green-700 dark:hover:text-green-400",
        "hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50",
        "dark:hover:from-green-900/20 dark:hover:to-cyan-900/20",
      ),
    }
  },

  container: {
    header: clsx(
      "sticky top-0 z-50 w-full",
      "border-b border-green-200/20 dark:border-green-800/20", 
      "bg-white/90 dark:bg-neutral-950/90",
      "backdrop-blur-xl shadow-sm",
    ),
    nav: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8",
    mobileMenu: clsx(
      "lg:hidden border-t border-green-200/20 dark:border-green-800/20",
      "bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl px-6 py-4"
    ),
  }
};

export const createButtonClass = (variant: keyof typeof components.button.variants, size: keyof typeof components.button.sizes = 'md') => {
  return clsx(
    components.button.base,
    components.button.sizes[size],
    components.button.variants[variant]
  );
};

export const createNavLinkClass = (variant: keyof typeof components.navLink.variants = 'default') => {
  return clsx(
    components.navLink.base,
    components.navLink.variants[variant]
  );
};