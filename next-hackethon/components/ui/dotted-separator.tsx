import React from "react";
import { cn } from "@/lib/utils";

type DottedSeparatorProps = {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "HORIZONTAL" | "VERTICAL";
};

const DottedSeparator: React.FC<DottedSeparatorProps> = ({
  className,
  color = "#CFCFCF",
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "HORIZONTAL",
}) => {
  const isHorizontal = direction === "HORIZONTAL";

  return (
    <div
      className={cn(
        isHorizontal
          ? "w-full flex items-center"
          : "h-full flex flex-col items-center",
        className
      )}
    >
      <div
        className={cn(isHorizontal ? "flex-grow" : "flex-grow-0")}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundSize: isHorizontal
            ? `${parseInt(dotSize) + parseInt(gapSize)}px`
            : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default DottedSeparator;
