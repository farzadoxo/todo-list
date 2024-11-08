
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

type PriorityDropDownMenuProps = {
  selected: string;
  onValueChangeSetter: (value: string) => void; // Updated type definition
}

const PriorityDropDownMenu: React.FC<PriorityDropDownMenuProps> = ({ selected = "none", onValueChangeSetter }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          fill="currentColor"
          className="w-8 h-8 min-w-8 sm:w-10 sm:h-10" // Responsive size
        >
          <g>
            <path d="M9,3.5C9,2.7,8.3,2,7.5,2h-3C3.7,2,3,2.7,3,3.5v45C3,49.3,3.7,50,4.5,50h3C8.3,50,9,49.3,9,48.5V3.5z" />
            <path d="M47.5,7.7c-16,8.4-14.2-8.8-33.5-2.1c-0.6,0.2-1,0.8-1,1.4v23.3c0,0.7,0.7,1.2,1.3,0.9
                    c19.2-6.4,17.2,11.2,33.9,1.8c0.5-0.3,0.8-0.8,0.8-1.3V8.5C49,7.8,48.2,7.3,47.5,7.7z"/>
          </g>
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>to ease my mind</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selected} onValueChange={onValueChangeSetter}>
          <DropdownMenuRadioItem value="none" >
            none
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low" >
            low
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium" >
            medium
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="high" >
            high
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}


export default PriorityDropDownMenu;
