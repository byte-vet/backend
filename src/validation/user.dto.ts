interface UserDTO {
  fullName: string;
  email: string;
  password: string;
}

interface ClientDTO extends UserDTO {
}

interface VetDTO extends UserDTO {
  clinicName: string;
  clinicLoc: string;
}

export { ClientDTO, VetDTO };