/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  ghub: string;
  @ApiProperty()
  ghub_url_profile: string;
  @ApiProperty()
  ghub_url_repo: string;
  @ApiProperty()
  cep: string;
  @ApiProperty()
  addressUF: string;
  @ApiProperty()
  addressCity: string;
  @ApiProperty()
  addressDistrict: string;
  @ApiProperty()
  addressStreet: string;
  @ApiProperty()
  addresNumber: string;
  @ApiProperty()
  addressComplement?: string;
}
