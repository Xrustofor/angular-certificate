import { Injectable } from '@angular/core';
import { IDecoderData } from '../interfaces/decoderData.interface';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  constructor(){
    this.create()
  }

  setActive(uuid: string): void {
    if(!this.isExist()) return;
    let items = this.getItems();
    if(Array.isArray(items)){
      items = items.map((item) => {
        if(item.uuid === uuid ){
          item.active = true;
        }else{
          delete item.active
        }
        return item
      })
    }
    localStorage.setItem('certificates', JSON.stringify(items))
  }

  setItem(item: IDecoderData){
    if(this.isItem(item.commonName)) return;
    const data: IDecoderData[] = this.getItems();
    let result = data.map(d => {
      delete d.active;
      return d
    })
    item.active = true;
    result.unshift(item);
    localStorage.setItem('certificates', JSON.stringify(result))
  }

  public getItemActive(): IDecoderData | null {
    if(!this.isExist()) return null;
    const items = this.getItems();
    const candidate = items.find(item => item.active);
    return candidate || null
  }

  public getItems(): IDecoderData[] {
    if(this.isExist()){
      const result: string | null = localStorage.getItem('certificates');
      if(!result){ return [] }
      const parseData: IDecoderData[] = JSON.parse(result)
      return parseData;
    }else{
      return []
    }
  }

  private isItem(name: string = ''): boolean{
    const items = this.getItems();
    return !!items.find((item:IDecoderData) => item.commonName === name );
  }

  private isExist(): boolean {
    return !!localStorage.getItem('certificates')
  }

  private create(): void {
    if (!this.isExist()) {
      localStorage.setItem('certificates', '[]');
    }
  }
}
