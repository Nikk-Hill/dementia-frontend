import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  reactions: {
    thumbsUp: number;
    // Add more reactions if needed
  };
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://your-api-url.com/posts'; // Replace with your actual API URL

  //constructor(private http: HttpClient) { }

  constructor() { }

  getPosts(): Observable<Post[]> {
    const posts: Post[] = [
      {
        id: 1,
        title: 'First Post',
        content: 'This is the content of the first post.',
        author: 'Author 1',
        date: '2024-07-18',
        reactions: {
          thumbsUp: 0
          // Initialize other reactions if needed
        },
        comments: [
          { id: 1, author: 'Commenter 1', content: 'Great post!', date: '2024-07-18' },
          { id: 2, author: 'Commenter 2', content: 'Very informative.', date: '2024-07-18' }
        ]
      },
      {
        id: 2,
        title: 'Second Post',
        content: 'This is the content of the second post.',
        author: 'Author 2',
        date: '2024-07-18',
        reactions: {
          thumbsUp: 2
          // Initialize other reactions if needed
        },
        comments: []
      }
      // Add more posts as needed
    ];
    return of(posts);
    //return this.http.get<Post[]>(this.apiUrl);
  }
}
