import { TopicDataService } from './../services/topic.service';
import { Component, OnInit } from '@angular/core';
import { Topic } from '../models/topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  allTopics: Topic[] = [];
  tempTopic: Topic = new Topic();
  searchResponce: Topic = new Topic();
  searchKey: number| string;
  isSearched: boolean = false;
  heading: string = "All Topics";
  searchResult: string;
  isFound: boolean;
  displayTopic: boolean = true;
  isAdding: boolean = false;

  constructor(private topic: TopicDataService){}

  searchTopic(SearchKey: number| string): void{
    this.searchResponce = undefined;
    this.isFound = false;
    this.searchResult = "No match found!!";
    this.heading="Search results";
    this.isSearched=true;
    this.displayTopic = false;
    for( let topic of this.allTopics)
    {
      if(SearchKey == topic.id || SearchKey == topic.name){
        this.searchResponce = topic;
      }
    }
    if(typeof this.searchResponce != 'undefined'){
      this.searchResult= "Match found!!";
      this.isFound = true;
    }
  }
  toogleDisplay(){
    this.isSearched = false;
    this.displayTopic = true;
    this.isAdding = false;
    this.heading = "All Topics";
    this.ngOnInit();
  }
  showForm(){
    this.displayTopic = false;
    this.isSearched = false;
    this.isAdding = true;
    this.heading = "Add topic";
  }
  addTopic(){
    this.topic.addTopic(this.tempTopic.name, this.tempTopic.description, this.tempTopic.surveyorId).subscribe();
    this.ngOnInit();  
  }
  removeTopic(id: number) { 
    if(window.confirm(`Sure you want to delete topic with id: ${id}??`)){
        this.topic.removeTopic(id).subscribe();
      window.alert(`Topic with id: ${id} deleted successfully.`);
    this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.topic.getAllTopics().subscribe(data => this.allTopics = data);
  }
}
