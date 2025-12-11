import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmployees',
  standalone: true
})
export class FilterEmployeesPipe implements PipeTransform {
  transform(list: any[], search: string): any[] {
    if (!search) return list;
    search = search.toLowerCase();

    return list.filter(item =>
      item.name.toLowerCase().includes(search)
    );
  }
}

