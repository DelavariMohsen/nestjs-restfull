import { Length, IsNotEmpty, ValidateNested } from 'class-validator'
import { ValidatableIdName } from 'src/common/interfaces/id-name.interface';

export class AddArticleDto {
    @Length(3, 135)
    @IsNotEmpty()
    title: string;
    @Length(15)
    @IsNotEmpty()
    content: string;
    @ValidateNested()
    @IsNotEmpty()
    author: ValidatableIdName;

}