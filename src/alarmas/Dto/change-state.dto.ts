import { IsBooleanString } from 'class-validator';

export class UpdateAlarmDto {

    @IsBooleanString()
    readonly isOn: Boolean;
}
