import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Bank } from '../bank.model';

const EXAMPLE_DATA: Bank[] = [
  {ispb: 1, bankName: 'Hydrogen' , bankCode: 10},
  {ispb: 2, bankName: 'Helium' , bankCode: 1},
  {ispb: 3, bankName: 'Lithium' , bankCode: 23},
  {ispb: 4, bankName: 'Beryllium' , bankCode: 21},
  {ispb: 5, bankName: 'Boron' , bankCode: 41},
  {ispb: 6, bankName: 'Carbon' , bankCode: 123},
  {ispb: 7, bankName: 'Nitrogen' , bankCode: 56},
  {ispb: 8, bankName: 'Oxygen' , bankCode: 564},
  {ispb: 9, bankName: 'Fluorine' , bankCode: 4567},
  {ispb: 10, bankName: 'Neon' , bankCode: 1640},
  {ispb: 11, bankName: 'Sodium' , bankCode: 16450},
  {ispb: 12, bankName: 'Magnesium' , bankCode: 1450},
  {ispb: 13, bankName: 'Aluminum' , bankCode: 140},
  {ispb: 14, bankName: 'Silicon' , bankCode: 140},
  {ispb: 15, bankName: 'Phosphorus' , bankCode: 140},
  {ispb: 16, bankName: 'Sulfur' , bankCode: 160},
  {ispb: 17, bankName: 'Chlorine' , bankCode: 104},
  {ispb: 18, bankName: 'Argon' , bankCode: 1450},
  {ispb: 19, bankName: 'Potassium' , bankCode: 1640},
  {ispb: 20, bankName: 'Calcium' , bankCode: 1045},
];

export class BankTableDataSource extends DataSource<Bank> {
  data: Bank[] = EXAMPLE_DATA;
  paginator: MatPaginator; //componente para paginação
  sort: MatSort; //componente para ordenação

  constructor() {
    super();
  }


  connect(): Observable<Bank[]> { //conecta todos os dados da tabela no elemento datasource

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: Bank[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Bank[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'ispb': return compare(+a.ispb, +b.ispb, isAsc);
        case 'bankCode': return compare(+a.bankCode, +b.bankCode, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
