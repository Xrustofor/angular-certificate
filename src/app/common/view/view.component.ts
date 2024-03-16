import { Component, Input } from '@angular/core';
import { IDecoderData } from '../../interfaces/decoderData.interface';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent{
  @Input() item: IDecoderData | null = {};
}
