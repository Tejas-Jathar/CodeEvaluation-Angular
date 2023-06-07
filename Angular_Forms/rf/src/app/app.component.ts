import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators ,FormArray } from '@angular/forms';
import { forbiddernNameValidator,passwordValidator1 } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = '';

  // Creating Model using instantiation method

  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalcode: new FormControl('')
  //   })
  // });


  // loadApiData(){
  //   this.registrationForm.patchValue({
  //     userName:'TNJ',
  //   password: 'Tj123',
  //   confirmPassword: 'Tj123',
  //   address:{
  //     city: 'Mumbai',
  //     state: 'MH',
  //     postalcode: '400025'
  //   }
  //   });
  // }


    get userName(){
      return this.registrationForm.get('userName');
    }

    get password(){
      return this.registrationForm.get('password');
    }

    get cpassword(){
      return this.registrationForm.get('confirmPassword');
    }

    get email(){
      return this.registrationForm.get('email');
    }

    get alternateEmails(){
      return this.registrationForm.get('alternateEmails') as FormArray;
    }

    addAlternateEmail(){
      this.alternateEmails.push(this.fb.control(''));
    }


      //creating form model using formbuilder
//   constructor(private fb: FormBuilder){}

//     registrationForm = this.fb.group({
//       userName:['',[Validators.required , Validators.minLength(4), Validators.maxLength(12),forbiddernNameValidator(/password/)]],
//       password:['',[Validators.required,Validators.minLength(8),passwordValidator1()]],
//       // password:[''],
//       confirmPassword:[''],
//       address:this.fb.group({
//         city:[''],
//         state:[''],
//         postalcode:['']
//       })
//     },{Validator: PasswordValidator}); 
// }

registrationForm : FormGroup;
constructor(private fb: FormBuilder , private registrationservice : RegistrationService){}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12), forbiddernNameValidator(/password/)]],
      email:[''],
      subscribe:[false],
      password: ['', [Validators.required, Validators.minLength(8), PasswordValidator,passwordValidator1()]],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalcode: ['']
      }),
      // alterateEmails : this.fb.array([])
    }, { validator: PasswordValidator});

    // this.registrationForm.get('subscribe').valueChanges
    // .subscribe(checkedValue => {
    //   const email = this.registrationForm.get('email');
    //   if(checkedValue){
    //     email.setValidators(Validators.required);
    //   }else{
    //     email.clearValidators();
        
    //   }
    //   email.updateValueAndValidity();
    // })
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.registrationservice.register(this.registrationForm.value)
    .subscribe(
      response => console.log('Success',response),
      error => console.error('Error',error)
    );
  }
}