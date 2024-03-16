import { Injectable } from '@angular/core';
import ASN1 from '../../libraries/asn1/asn1';
import { IDecoderData } from '../interfaces/decoderData.interface';

interface IAsn1 {
  header: number,
  length: number,
  stream: {
    enc: string,
    pos: number
  },
  sub: IAsn1[] | null,
  tag: {
    tagClass: number,
    tagConstructed: boolean,
    tagNumber: number
  }
  content(): string,
  posContent(): number,
  posEnd(): number,
  posStart(): number,
  toB64String(): string,
  toHexString(): string,
  toPrettyString(): string,
  toString(): string,
  typeName(): string,
}

interface IProperty<T, P> {
  [T: string]: P
}

@Injectable({ providedIn: 'root'})
export class DecodeService{
  keyName = '';
  issuerName = '';
  constructor(){}

  public decode(binaryString: string): IDecoderData| null {
    const result = ASN1.decode(binaryString) as IAsn1;
    const data = this.dump(result, []);
    return this.dataFormation(data)
  }

  private dump = (e: IAsn1, append: unknown[] | null) => {
    const self = this;
    let s = append, t = e.typeName(), added = false;
    let content = t != 'NULL' ? String(e.content()).toString() : "NULL";
    if(!Array.isArray(s)) return;
    if (t == 'SEQUENCE') {
      if(!this.issuerName){
        this.issuerName = t;
        s.push({ issuerName: t })
      }
      added = true;
    } else if (t == 'SET') {
      added = false;
    } else if (String(t).match('\[[0-9]\]')) {
    } else if (t == 'NULL') {
    } else if (t == 'BIT_STRING') {
    }
    else if (t == 'OBJECT_IDENTIFIER') {
      let temp: string | string[] = content.split('.').join("").toString();
      temp = temp.split(" ")
      if(temp[2]){
        this.keyName = temp[2]
        added = true;
      }
    }
    else if (t == 'UTF8String') {
      if(this.keyName){
        const item: IProperty<string, string> = {[this.keyName]: content}
        s.push(item);
        this.keyName = ''
        added = true;
      }
    }
    else if (t == 'IA5String') {
      s.push(content);
      added = true;
    } else if (t == 'UTCTime') {
      s.push({[String("UTCTime").toString()]: content});
      added = true;
    }
    if (e.sub) e.sub.forEach(function (e1: IAsn1) {
      if (added) {
        self.dump(e1, s)
      }
      else {
        if(!Array.isArray(s)) { return }
        if(typeof e1 === 'undefined') { return }
        s.push(self.dump(e1, []));
      }
    });
    return s;
  };
  private dataFormation(items: unknown[] | undefined): IDecoderData | null{
    let result: IProperty<string, string> = {};
    if(!Array.isArray(items)) return null;

    let UTCTime = null;

    items.forEach(item => {

      if(!Array.isArray(item) && typeof item === 'object'){
        if(item === null) return;

        if(item['UTCTime']){
          if(!UTCTime){
            UTCTime = item['UTCTime'];
            result['startDate'] = item['UTCTime'];
          }else{
            UTCTime = null;
            result['endDate'] = item['UTCTime'];
          }
        }else{
          result = {
            ...result,
            ...item
          }
        }
      }else if(item && Array.isArray(item) && item.length) {
        if(Array.isArray(item[0])) return;
        result = {
            ...result,
            ...item[0]
          }
      }
    })
    return result as IDecoderData;
  }
}

