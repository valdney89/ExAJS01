import { Component, OnInit, Input } from '@angular/core';
import { ListService } from './lista.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { List } from './lista';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  list: any = [];
  itensForm: FormGroup;

  constructor(
    public listService: ListService,
    public router: Router,
    public fb: FormBuilder
  ) {
    this.itensForm = fb.group({
      name: '',
    });
  }

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    return this.listService.getList().subscribe((data: {}) => {
      this.list = data;
    });
  }

  addItem() {
    const item = new List();
    item.name = this.itensForm.get('name').value;
    this.listService.createItem(item).subscribe((data: {}) => {
      this.loadList();
    });
  }

  removeItem(id) {
    this.listService.deleteItem(id).subscribe((data) => {
      this.loadList();
    });
  }
}
