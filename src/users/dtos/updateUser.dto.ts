import { Address } from "src/schemas/common/address.schema"


export class UpdateUserDto {
    username : string
    firstName : string
    lastName : string
    address : Address
}