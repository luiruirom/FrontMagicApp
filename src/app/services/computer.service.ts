import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Computer } from '../model/computer.interface';
import { NewsApiResponse } from '../model/news.interface';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private http = inject(HttpClient);

  list(){
    return this.http.get<Computer[]>('http://localhost:8080/api/computer');
  }

  get(id: number){
    return this.http.get<Computer>(`http://localhost:8080/api/computer/${id}`);
  }

  create(computer: Computer){
    return this.http.post<Computer>('http://localhost:8080/api/computer', computer);
  }

  update(id: number, computer: Computer){
    return this.http.put<Computer>(`http://localhost:8080/api/computer/${id}`, computer);
  }

  delete(id: number){
    return this.http.delete<void>(`http://localhost:8080/api/computer/${id}`);
  }

  newsList(){
    return this.http.get<NewsApiResponse>('https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=d759a9cda4594034a42ca1f1f463dba4');
  }

}

