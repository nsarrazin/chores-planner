import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";

type PopoverPickerProps = {
  isAdmin: boolean,
  color: string,
  onChange: (newColor: string) => void
}
export const PopoverPicker = ({ isAdmin, color, onChange }: PopoverPickerProps) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);
  const [colorLocal, setColor] = useState<string>(color);

  const close = useCallback(() => {onChange(colorLocal); toggle(false)}, [colorLocal]);

  useClickOutside(popover, close);

  return (
    <div className="picker">
      {isAdmin ? <div
        className="swatch"
        style={{ backgroundColor: colorLocal }}
        onClick={() => toggle(true)}
      /> : <div
      className="swatch"
      style={{ backgroundColor: colorLocal }}
    /> }

      {isOpen && (
        <div className="popover" ref={popover} style={{ zIndex: "999" }}>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </div>
  );
};
