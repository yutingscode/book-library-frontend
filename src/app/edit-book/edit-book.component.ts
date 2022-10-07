import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BookService } from '../service/book.service';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book = {
    isbn: "",
    bookTitle: "",
    author: "",
    publishedYear: "",
    image: ""
  };
  
  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, private location: Location) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const isbn = String(this.route.snapshot.paramMap.get('isbn'));
    this.bookService.getBook(isbn)
      .subscribe(book => this.book =book);
  }

  onSaveBook() {
    var regex = /^\d+$/;
    if(!regex.test(this.book.publishedYear)) {
      alert('Invalid published year input. Please redo.');
      this.book.publishedYear = "";
      return;
    } 

    this.bookService.editBook(this.book).subscribe({
      complete: () => { 
        this.location.back();
        alert('The book has been edited.');
      }
    })
  }

  onGoBack() {
    this.location.back();
  }
}
