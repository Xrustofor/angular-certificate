import { Component, OnInit } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import { IDecoderData } from './interfaces/decoderData.interface';
import { DecodeService } from './services/decode.service';
import { LocalStorageService } from './services/local-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  listItems: IDecoderData[] = [];
  item: IDecoderData | null = {};
  viewShow = false;
  addShow = false;

  constructor(
    private decodeService: DecodeService,
    private localStorageService: LocalStorageService
  ){}

  ngOnInit(): void {
   this.updateItems();
  }

  updateItems(){
    this.listItems = this.localStorageService.getItems();
    this.item = this.localStorageService.getItemActive();
    this.viewShow = !!this.item;
    this.addShow = false
  }

  onDrop(file: Blob){
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        throw new Error("Your browser could not read the specified file");
      }

      try{
        const result: IDecoderData | null = this.decodeService.decode(<string>reader.result);
        if(!result) return;
        const { commonName, issuerName, endDate, startDate } = result;

        const item: IDecoderData = {
          uuid: uuidv4(),
          issuerName,
          commonName,
          endDate,
          startDate
        }
        this.localStorageService.setItem(item);
        this.updateItems();

      }catch (e){
        console.error(e);
      }

    };
    reader.readAsBinaryString(file);
    this.listItems = this.localStorageService.getItems();

  }

  selectHandler(uuid: string): void {
    this.localStorageService.setActive(uuid);
    this.addShow = false;
    this.updateItems()
  }
}
