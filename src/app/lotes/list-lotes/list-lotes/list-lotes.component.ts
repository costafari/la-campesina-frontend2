import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lotes } from '../../lotes';
import { LacampesinaService } from 'src/app/lacampesina.service';

@Component({
  selector: 'app-list-lotes',
  templateUrl: './list-lotes.component.html',
  styleUrls: ['./list-lotes.component.css']
})
export class ListLotesComponent implements OnInit {

  listAllLotes: Lotes[];
  url: String = "lotes";
  
  constructor(private lacampesinaService: LacampesinaService, private router: Router) { }

  ngOnInit(): void {
    this.showAllLotes();
  }

  showAllLotes(): void{
    this.lacampesinaService.getAllObjects(this.url).subscribe(
      Lotes => this.listAllLotes = Lotes
    )
  }

  deleteLote(id: Number): void{
    this.lacampesinaService.deleteObject(this.url, id).subscribe(
      Lotes => this.showAllLotes()
    )
  }

}
