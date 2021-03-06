import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[]=[];
  page = 1;
  totalPokemons!: number;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons(){
    this.data.getPokemons(10,this.page + 0).subscribe((response:any)=>{
      this.totalPokemons = response.count;
      response.results.forEach((result:any) =>{
        this.data.getMorePokemons(result.name).subscribe((uniqResponse: any) =>{
          this.pokemons.push(uniqResponse);
          console.log(this.pokemons)
        });
      });
    });
  }

}
