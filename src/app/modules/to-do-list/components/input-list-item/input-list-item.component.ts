import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { IListItems } from '../../Interface/IListItems.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({ required: true }) public inputListItems:IListItems[]=[];
  @Output() public outputUpdateitemCheckbox = new EventEmitter<{
    checked:boolean; 
    id:string;
  }>();
  public updateItemCheckBox(checked:boolean,   id:string ){
      return this.outputUpdateitemCheckbox.emit( 
        {id,checked}
      );
    }
      
    @Output() public outputUpdateitemText = new EventEmitter<{
        value:string; 
        id:string;
      }>();
      public updateItemText(value:string,   id:string ){
          return this.outputUpdateitemText.emit( 
            {id,value}
          );
        }

        @Output() public outputDeleteitem = new EventEmitter<{
          id:string;
        }>();
        public deleteItem(   id:string ){
            return this.outputDeleteitem.emit( 
              {id}
            );
          }
}
