import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})

export class CommunityComponent implements OnInit {
  posts: Post[] = [];
  newComment: string[] = [];
  showComments: boolean[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.newComment = new Array(posts.length).fill('');
      this.showComments = new Array(posts.length).fill(false); 
    });
  }

  react(post: Post, reactionType: 'thumbsUp'): void {
    post.reactions[reactionType]++;
  }

  toggleComments(index: number): void {
    this.showComments[index] = !this.showComments[index];  // Toggle the visibility
  }

  addComment(post: Post, index: number): void {
    if (this.newComment[index].trim()) {
      const newComment: Comment = {
        id: post.comments.length + 1,
        author: 'Current User',
        content: this.newComment[index],
        date: new Date().toISOString().split('T')[0]
      };
      post.comments.push(newComment);
      this.newComment[index] = '';
    }
  }
}

