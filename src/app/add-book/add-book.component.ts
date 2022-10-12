import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {

  bookTitle: string = "";
  author: string = "";
  publishedYear: string = "";
  isbn: string = "";
  image: any;

  selectedFile: any;

  constructor( private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
  }

  onAddBook() {

    var newBook = {
      bookTitle: this.bookTitle,
      author: this.author,
      publishedYear: this.publishedYear,
      isbn: this.isbn,
      image: this.image
    }

    var regex = /^\d+$/;
    if(!regex.test(newBook.publishedYear)) {
      alert('Invalid published year input. Please redo.');
      this.publishedYear = "";
      return;
    } 
    
    if (!regex.test(newBook.isbn)) {
      alert('Invalid isbn input. Please redo.');
      this.isbn = "";
      return;
    }

    this.bookService.addBook(newBook).subscribe({
        complete: () => { 
          this.router.navigate(['/books']);
          alert('The book has been added.');
        }
      })
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.image = reader.result;
    };
  }
}
