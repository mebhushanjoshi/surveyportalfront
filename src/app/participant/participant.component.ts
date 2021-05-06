import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant';
import { ParticipantDataService } from '../services/participant.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  allParticipant: Participant[] = [];
  tempParticipant: Participant = new Participant();
  searchResponce: Participant = new Participant();
  searchKey: number| string;
  isSearched: boolean = false;
  heading: string = "All Participants";
  searchResult: string;
  isFound: boolean;
  displayParticipant: boolean = true;
  isAdding: boolean = false;
  isUpdating: boolean = false;

  constructor(private participant: ParticipantDataService){}

  searchParticipant(SearchKey: number| string): void{
    this.searchResponce = undefined;
    this.isFound = false;
    this.searchResult = "No match found!!";
    this.heading="Search results";
    this.isSearched=true;
    this.displayParticipant = false;
    for( let participant of this.allParticipant)
    {
      if(SearchKey == Participant.name){
        this.searchResponce = participant;
      }
    }
    if(typeof this.searchResponce != 'undefined'){
      this.searchResult= "Match found!!";
      this.isFound = true;
    }
  }
  toogleDisplay(){
    this.isSearched = false;
    this.displayParticipant = true;
    this.isAdding = false;
    this.heading = "All Participants";
    this.ngOnInit();
  }
  showForm(){
    this.displayParticipant = false;
    this.isSearched = false;
    this.isAdding = true;
    this.heading = "Add participant";
  }

  showForm2(){
    this.displayParticipant = false;
    this.isSearched = false;
    this.isUpdating = true;
    this.heading = "Update participant";
  }
  addParticipant(){
    this.participant.addParticipant(this.tempParticipant.firstName, this.tempParticipant.lastName, this.tempParticipant.username).subscribe();
    this.ngOnInit();  
  }

  updateParticipant(){
    this.participant.updateParticipant(this.tempParticipant.id, this.tempParticipant.firstName, this.tempParticipant.lastName, this.tempParticipant.username).subscribe();
    this.ngOnInit();  
  }

  removeParticipant(id: number) { 
    if(window.confirm(`Sure you want to delete participant with id: ${id}??`)){
        this.participant.removeParticipant(id).subscribe();
      window.alert(`Participant with id: ${id} deleted successfully.`);
    this.ngOnInit();
    }
  }
  ngOnInit(): void {
    this.participant.getAllParticipant().subscribe(data => this.allParticipant = data);
  }
}