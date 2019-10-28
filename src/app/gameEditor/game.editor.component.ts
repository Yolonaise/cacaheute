import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-editor',
  templateUrl: './game.editor.component.html',
  styleUrls: ['./game.editor.component.scss']
})

export class GameEditorComponent implements OnInit {
  mode: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');
  }

}
