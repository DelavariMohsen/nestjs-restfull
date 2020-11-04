import { IsNumber, IsNotEmpty, Length } from 'class-validator'

export interface IdName {
    id: number;
    name: string;
}

export class ValidatableIdName {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @Length(2, 135)
    @IsNotEmpty()
    name: string;
}