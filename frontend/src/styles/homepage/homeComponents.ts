import clsx from "clsx";

export const components = {
  general: {
    container: clsx("min-h-screen", "dark:bg-[#1b1b1b]"),
  },
  wrapper: {
    container: clsx("w-4/5", "pt-[150px] pb-[20px] mx-auto"),
  },
  bigtext: clsx(
    "text-[5rem]/[1] font-semibold tracking-tighter",
    "block",
    "text-white light:text-black",
  ),
  smallText: clsx(
    "mt-[40px] mx-auto mt-6 ",
    "smallText max-w-2xl",
    "text-lg text-neutral-500 light:text-neutral-500 text-center",
  ),
  button1: clsx(
    "bg-green-600 hover:bg-green-700",
    "text-white font-semibold",
    "py-2 px-6",
    "rounded-lg transition-colors cursor-pointer",
  ),
  button2: clsx(
    "bg-neutral-800 hover:bg-neutral-700",
    "font-semibold text-neutral-200",
    " py-2 px-6",
    "rounded-lg transition-colors cursor-pointer",
  ),
};
