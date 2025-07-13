type TButton = {
  variant?: "filled" | "text" | "border";
} & React.HTMLAttributes<HTMLButtonElement>;

export default function button(props: TButton) {
  const { children, variant = "border", className, ...rest } = props;

  return (
    <button
      {...rest}
      className={`
        cursor-pointer rounded-sm px-2 py-[2px]
        ${
          variant === "filled" &&
          `
            bg-foreground text-white border border-white
            hover:bg-foreground/90 active:bg-foreground/80
          `
        }
        ${
          variant === "text" &&
          `
            hover:bg-foreground/10 active:bg-foreground/20
          `
        }
        ${
          variant === "border" &&
          `
            border border-foreground hover:bg-foreground/10 active:bg-foreground/20
          `
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}
