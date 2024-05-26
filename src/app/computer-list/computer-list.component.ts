import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComputerService } from '../services/computer.service';
import { Computer } from '../model/computer.interface';
import { Article, NewsApiResponse } from '../model/news.interface';
import { AppModule } from '../app.module';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-computer-list',
  standalone: true,
  imports: [RouterModule],
  providers: [JwtInterceptor],
  templateUrl: './computer-list.component.html',
  styleUrl: './computer-list.component.css'
})
export default class ComputerListComponent implements OnInit{
  private computerService = inject(ComputerService);
  private loginService = inject(LoginService);
  computers: Computer[] = [];

  responsiveOptions: any[] | undefined;

  newsList: Article[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.computerService.list()
      .subscribe(computers => {
        this.computers = computers;
      });

    this.computerService.newsList()
      .subscribe(news => {
        this.newsList = news.articles;
      });
  }

  delete(computer: Computer) {
    this.computerService.delete(computer.id)
      .subscribe(() => {
        this.loadData();
        console.log("Computer deleted successfully!")
    });
  }

  checkToken(){
    if(this.loginService.userToken != ""){
      return true;
    }
    return false;
  }

}
