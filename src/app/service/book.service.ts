import { Injectable } from '@angular/core';
import { Book } from '../book';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookService {

  constructor(private http: HttpClient) { }

  private booksUrl = 'http://localhost:8080/books';  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getBooks(): Observable<any> {
    return this.http.get<any>(this.booksUrl) 
    .pipe(
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  getBook(isbn: string): Observable<any> {
    return this.http.get<any>(this.booksUrl+'/'+isbn);
  }

  addBook(book: Book) {
    return this.http.post<Book>(this.booksUrl, book);
  }

  deleteBook(isbn: string): Observable<Book> {
    return this.http.delete<Book>(this.booksUrl+'/'+isbn);
  }
  
  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.booksUrl+'/'+book.isbn, book);
  }
  
}
