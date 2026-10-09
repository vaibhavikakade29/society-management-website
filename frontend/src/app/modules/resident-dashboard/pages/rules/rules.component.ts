import { Component, OnInit } from '@angular/core';
import { RuleService } from 'src/app/core/services/rule.service';
import { ToastService } from 'src/app/core/services/toast.service';


@Component({

  selector: 'app-rules',

  templateUrl: './rules.component.html',

  styleUrls: ['./rules.component.css']

})
export class RulesComponent implements OnInit {



  rules:any[] = [];

  filteredRules:any[] = [];



  searchText = '';

  selectedCategory = '';

  selectedPriority = '';





  categories = [

    'General',
    'Security',
    'Maintenance',
    'Community',
    'Parking',
    'Pets',
    'Emergency',
    'Cleanliness',
    'Finance',
    'Safety',
    'Facilities'

  ];





  priorities = [

    'Low',
    'Normal',
    'High'

  ];







  /*
  =========================================================
      STATIC DEFAULT RULES
  =========================================================
  */


  staticRules:any[] = [



    {

      _id:'static1',

      title:'Maintain Silence',

      description:
      'Avoid loud music and disturbances after 10 PM to maintain peace inside society.',

      category:'General',

      priority:'High',

      isPinned:true,

      createdAt:new Date()


    },




    {

      _id:'static2',

      title:'Visitor Entry',

      description:
      'All visitors must register at the security gate before entering society premises.',

      category:'Security',

      priority:'High',

      isPinned:true,

      createdAt:new Date()


    },




    {

      _id:'static3',

      title:'Parking Guidelines',

      description:
      'Residents must park vehicles only in their assigned parking spaces.',

      category:'Parking',

      priority:'Normal',

      isPinned:false,

      createdAt:new Date()


    },




    {

      _id:'static4',

      title:'Waste Management',

      description:
      'Wet and dry waste should be separated before disposal.',

      category:'Cleanliness',

      priority:'High',

      isPinned:false,

      createdAt:new Date()


    },




    {

      _id:'static5',

      title:'Emergency Safety',

      description:
      'Emergency exits and fire safety equipment should never be blocked.',

      category:'Safety',

      priority:'High',

      isPinned:true,

      createdAt:new Date()


    }


  ];








  constructor(

    private ruleService:RuleService,

    private toast:ToastService

  ){}





  ngOnInit():void{


    this.loadRules();


  }









  /*
  =========================================================
      LOAD ALL RULES
  =========================================================
  */


  loadRules():void{


    this.ruleService

    .getRules()

    .subscribe({



      next:(response)=>{


        const backendRules =

        response.rules || [];




        this.rules = [

          ...this.staticRules,

          ...backendRules

        ];




        this.filteredRules = [

          ...this.rules

        ];



      },





      error:()=>{


        this.rules = [

          ...this.staticRules

        ];



        this.filteredRules = [

          ...this.rules

        ];



        this.toast.showError(

          "Showing default society guidelines."

        );


      }



    });



  }









  /*
  =========================================================
      FILTER RULES
  =========================================================
  */


  filterRules():void{


    this.filteredRules =


    this.rules.filter(rule=>{



      const search =


      rule.title

      .toLowerCase()

      .includes(

        this.searchText.toLowerCase()

      );






      const category =


      !this.selectedCategory ||

      rule.category === this.selectedCategory;







      const priority =


      !this.selectedPriority ||

      rule.priority === this.selectedPriority;






      return search && category && priority;



    });



  }

}