
import { Length, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator'
import { ValidatableIdName } from 'src/common/interfaces/id-name.interface';

export class EditArticleDto {
    @Length(3, 135)
    @IsNotEmpty()
    @IsOptional()
    title: string;
    @Length(15)
    @IsNotEmpty()
    @IsOptional()
    content: string;
    @ValidateNested()
    @IsNotEmpty()
    @IsOptional()
    author: ValidatableIdName;
}