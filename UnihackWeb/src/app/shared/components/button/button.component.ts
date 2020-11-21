import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() keyword: string;
  @Input() buttonColor: string;
  @Input() disabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
