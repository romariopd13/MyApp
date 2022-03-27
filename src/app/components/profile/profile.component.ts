import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: any[] = []
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getAllUsesrs();
  }
  getAllUsesrs() {
    this.authService.getAllUsers().subscribe(res => {
      this.users = res
    })
  }
}
