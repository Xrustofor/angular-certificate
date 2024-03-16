import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDecoderData } from '../../interfaces/decoderData.interface';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent{
  @Input() items: Array<IDecoderData> = [];
  @Output() onSelect = new EventEmitter<string>();

  select(uuid: string){
    if(uuid){
      this.onSelect.emit(uuid)
    }
  }
}
