import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  show = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe( (query: Params) => {
      if((typeof query['show'] !== "string")) { return};
      if( query['show'] !== 'true' && query['show'] !== 'false' ) return;
      this.show = JSON.parse(query['show']);
    })
  }

  back(){
    this.router.navigate(['/'], {
      queryParams: {show: false}
    });
  }
  save(){
    this.router.navigate(['/add'], {
      queryParams: {show: true}
    });
  }
}
