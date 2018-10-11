import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTodosDTO {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    text: string;

    @ApiModelProperty()
    complete: boolean;
}