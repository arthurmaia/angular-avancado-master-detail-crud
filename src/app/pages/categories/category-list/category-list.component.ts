import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  deleteCategory(category: Category) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (!mustDelete) return;

    this.categoryService.delete(category.id).subscribe({
      next: () =>
        (this.categories = this.categories.filter(
          (element) => element !== category
        )),
      error: () => alert('Erro ao tentar excluir!'),
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => alert('Erro ao carregar a lista'),
    });
  }
}
