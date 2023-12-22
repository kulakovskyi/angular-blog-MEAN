import {Injectable} from "@angular/core";
import {PostInterface} from "../interfaces/post.interface";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserResponseInterface} from "../interfaces/user-response.interface";
import {catchError, Observable, throwError} from "rxjs";
import {PostResponseInterface} from "../interfaces/post-response.interface";

@Injectable()

export class PostService{

  constructor(private http: HttpClient) {
  }

  createPost(post: PostInterface): Observable<PostResponseInterface>{
    let headers =
      new HttpHeaders({'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')})
    console.log(headers)
    return this.http.post<PostResponseInterface>('http://localhost:3000/dashboard', post,
      {headers: headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  getAllPosts(): Observable<PostResponseInterface[]>{
    return this.http.get<PostResponseInterface[]>('http://localhost:3000/').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }

  getPostById(id: string): Observable<PostResponseInterface>{
    return this.http.get<PostResponseInterface>(`http://localhost:3000/post/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }

  deletePost(id: string){
    return this.http.delete(`http://localhost:3000/post/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }

}
