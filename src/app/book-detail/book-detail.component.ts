import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})


export class BookDetailComponent implements OnInit {
  book: Book = {
    isbn: "",
    bookTitle: "",
    author: "",
    publishedYear: "",
    image: ""
  };
  

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private location: Location) { }

    ngOnInit(): void {
      this.getBook();
    }
    
    getBook(): void {
      const isbn = String(this.route.snapshot.paramMap.get('isbn'));
      this.bookService.getBook(isbn)
        .subscribe(book => this.book =book);
    }

    onDeleteBook(): void  {
      this.bookService.deleteBook(this.book.isbn).subscribe({
        complete: () => { 
          this.location.back();
          alert('The book has been deleted.');
        }
      })
    }

    onEditBook(): void {
      this.router.navigate(['detail/edit/' + this.book.isbn]);
    }

    onGoBack(): void {
      this.location.back();
    }

}
