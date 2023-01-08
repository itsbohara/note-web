import { Icon } from "@iconify-icon/react";
import { CSSProperties } from "react";

type ButtonSize = "large" | "small" | "medium";
type variant = "default" | "fill" | "outline";
type COLOR = "red" | "blue" | "green";

type ButtonProps = {
  icon: string;
  height?: number;
  width?: number;
  sx: CSSProperties;
  size?: ButtonSize;
  variant: variant;
  circular: boolean;
  color: COLOR;
};

export default function Button({
  icon,
  height,
  width,
  sx,
  variant = "default",
  size = "medium",
  circular = false,
  color = "blue",
}: ButtonProps) {
  let s = 24; // medium/defalt size
  if (size === "large") s = 40;
  else if (size === "small") s = 20;

  return (
    <div
      className="icon-button"
      data-circular={circular}
      style={{ padding: 10 }}
      data-size={size}
      data-variant={variant}
      data-color={color}
    >
      <Icon icon={icon} style={{ ...sx }} height={s} width={s} />
    </div>
  );
}
