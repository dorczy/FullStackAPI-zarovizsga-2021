import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  car$: Observable<Car> = this.activatedRoute.params.pipe(
    switchMap( params => this.carService.get(params.id))
  );
  carID: string = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.car$.subscribe(
      car => this.carID = car._id
    );
  }

  onUpdate(form: NgForm): void {
    const newCar = {...form.value, _id: this.carID}
    this.carService.update(newCar).subscribe(
      () => this.router.navigate(['/cars']),
      err => console.error(err)
    );
  }

}
