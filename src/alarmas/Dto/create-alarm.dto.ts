import { IsString, IsDate, IsBooleanString } from 'class-validator';

export class CreateAlarmDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly dayOfWeek: string;

    @IsDate()
    readonly alarmTime: Date;

    @IsBooleanString()
    readonly isOn: Boolean;
}
