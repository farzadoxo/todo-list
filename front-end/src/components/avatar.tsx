import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useLogOut } from './hooks/AuthHooks';
import { useNavigate } from 'react-router';


interface CustomAvatarProps {
  imageSrc: string;
  className?: string;
  onClick?: () => void;
}


const CustomAvatar: React.FC<CustomAvatarProps> = ({ imageSrc, className }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const [logout, logoutError] = useLogOut();

  //TODO: implement this handler
  const handleProfilePictureUpload = () => {
    console.log("profile pic changed")

  }

  const handleLogout = () => {
    if (logoutError) {
      console.log("there was an error on logout: ", logoutError)
      return;
    }
    logout()
  }

  return (

    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger >
        <Avatar className={className}>
          <AvatarImage src={imageSrc && imageSrc} />
          <AvatarFallback>LocalHost</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfilePictureUpload}>
          Profile pic
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("preference")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default CustomAvatar
