import AddPhotoIcon from "@/icons/PhotoIcon"
import React, { useState } from "react"
import { PhotoModal } from "./customModals"

const AddPhoto: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>

      <AddPhotoIcon size={24} className="cursor-pointer text-blue-500" onClick={() => setIsModalOpen(true)} />
      <PhotoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </>

  )
}

export default AddPhoto
