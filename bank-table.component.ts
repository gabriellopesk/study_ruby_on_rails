import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Bank } from '../bank.model';
import { BankTableDataSource } from './bank-table-datasource';

@Component({
  selector: 'app-bank-table',
  templateUrl: './bank-table.component.html',
  styleUrls: ['./bank-table.component.css']
})
export class BankTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Bank>;
  dataSource: BankTableDataSource;

  displayedColumns = ['ispb', 'bankName', 'bankCode'];

  ngOnInit() { //ao criar
    this.dataSource = new BankTableDataSource();
  }

  ngAfterViewInit() { // depois que todos os componentes foram inicializados 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
