import { IListItems } from './../../Interface/IListItems.interface';
import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { ElocalStorage } from '../../enum/ElocalStorage.Enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    InputAddItemComponent,
    InputListItemComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);
  #setListItems = signal<IListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #updateLocalStorage(){
    localStorage.setItem(ElocalStorage.MY_List,
      JSON.stringify(this.#setListItems()));
  }

  #parseItems(){
    return JSON.parse(localStorage.getItem(ElocalStorage.MY_List) || "[]");
  }

  public ListItemsStage(value: 'pending'| "completed"){
    return this.#setListItems().filter((res: IListItems) => {
      return value=='pending' ? !res.checked:res.checked;

    })

  }
  
  public UpdateitemText(newItem: {id:string; value: string}){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value;
          
        }

        return res;
      });

      return oldValue;
    });
    
this.#updateLocalStorage();
   
  }
    
  public deleteItem(newItem: {id:string;}){
    Swal.fire({
      title: "tem certeza?",
      text: "você não poderareverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:"Cancelar",
      confirmButtonText: "Sim, Delete o item!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
          oldValue= oldValue.filter((res) => {
            if (res.id === newItem.id) {
              return false;
              
            }
    
            return true;
          });
    
          return oldValue;
        });
        
        this.#updateLocalStorage();
      }
    });
    
    

   
  }
  public UpdateitemCheckbox(newItem: {id:string; checked: boolean}){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;
          
        }

        return res;
      });

      return oldValue;
    });
    
    this.#updateLocalStorage();
   
  }

  public deleteAllItems(){
    Swal.fire({
      title: "tem certeza?",
      text: "você não poderareverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:"Cancelar",
      confirmButtonText: "Sim, Delete tudo!"
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem(ElocalStorage.MY_List);
        return this.#setListItems.set(this.#parseItems());        
      }
    });


  }
  public getInputAddItem(value : IListItems){{
    localStorage.setItem(ElocalStorage.MY_List,
      JSON.stringify([...this.#setListItems(), value]));

      return this.#setListItems.set(this.#parseItems());

  }
}
}
