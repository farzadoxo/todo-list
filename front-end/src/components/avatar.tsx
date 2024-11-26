import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface CustomAvatarProps {
  imageSrc: string;
  onClick?: () => void
  className?: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ imageSrc, onClick, className }) => {

  return (

    <Avatar className={className}>
      <AvatarImage src={imageSrc && imageSrc} onClick={onClick} />
      <AvatarFallback>LocalHost</AvatarFallback>
    </Avatar>
  )
}


export default CustomAvatar
