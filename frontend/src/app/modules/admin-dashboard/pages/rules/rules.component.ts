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



  pinnedCount = 0;

  highPriorityCount = 0;



  showForm=false;

  isEdit=false;



  formData:any = {


    _id:'',

    title:'',

    description:'',

    category:'General',

    priority:'Normal',

    isPinned:false


  };





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









  loadRules():void{


    this.ruleService.getRules()

    .subscribe({


      next:(response)=>{


        const backendRules =
        response.rules || [];



        this.rules=[

          ...this.staticRules,

          ...backendRules

        ];



        this.filteredRules=[
          ...this.rules
        ];



        this.calculateStats();



      },



      error:()=>{


        this.rules=[
          ...this.staticRules
        ];



        this.filteredRules=[
          ...this.rules
        ];



        this.calculateStats();



        this.toast.showError(
          "Backend rules unavailable. Showing default guidelines."
        );



      }



    });



  }









  calculateStats():void{


    this.pinnedCount =

    this.rules.filter(

      rule=>rule.isPinned

    ).length;




    this.highPriorityCount =

    this.rules.filter(

      rule=>rule.priority==='High'

    ).length;



  }









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

      rule.category===this.selectedCategory;



      const priority =

      !this.selectedPriority ||

      rule.priority===this.selectedPriority;



      return search && category && priority;



    });



  }









  openAddForm():void{


    this.isEdit=false;

    this.showForm=true;



    this.formData={


      _id:'',

      title:'',

      description:'',

      category:'General',

      priority:'Normal',

      isPinned:false


    };



  }









  closeForm():void{


    this.showForm=false;


  }









  editRule(rule:any):void{


    if(rule._id.startsWith('static')){


      this.toast.showError(
        "Default guideline cannot be edited."
      );


      return;


    }



    this.isEdit=true;

    this.showForm=true;



    this.formData={

      ...rule

    };


  }









  saveRule():void{


    if(

      !this.formData.title ||

      !this.formData.description

    ){


      this.toast.showError(
        "Please fill all fields"
      );


      return;


    }






    if(this.isEdit){



      this.ruleService

      .updateRule(

        this.formData._id,

        this.formData

      )

      .subscribe(()=>{


        this.toast.showSuccess(
          "Rule updated"
        );


        this.closeForm();

        this.loadRules();


      });



    }

    else{



      this.ruleService

      .addRule(

        this.formData

      )

      .subscribe(()=>{


        this.toast.showSuccess(
          "Rule added"
        );


        this.closeForm();

        this.loadRules();


      });



    }



  }









  deleteRule(id:string):void{


    if(id.startsWith('static')){


      this.toast.showError(
        "Default guideline cannot be deleted."
      );


      return;


    }




    if(!confirm(

      "Delete this guideline?"

    )) return;





    this.ruleService

    .deleteRule(id)

    .subscribe(()=>{


      this.toast.showSuccess(
        "Rule deleted"
      );



      this.loadRules();



    });



  }



}