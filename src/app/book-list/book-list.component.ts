import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  selectedBook?: Book;
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  getHeroes(): void {
    this.bookService.getBooks()
    .subscribe(books => {
      if(books._embedded) {
        this.books=books._embedded.booksList;
      }
      });  }
}
