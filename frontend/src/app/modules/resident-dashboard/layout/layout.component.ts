import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PageLoaderService } from 'src/app/core/services/page-loader.service';
@Component({
    selector:'app-layout',
    templateUrl:'./layout.component.html',
    styleUrls:['./layout.component.css']
})
export class LayoutComponent implements OnInit{

    /*=========================================================
        CURRENT USER
    =========================================================*/

    currentUser:any={};

    /*=========================================================
        HEADER
    =========================================================*/

    greeting:string='';

    todayDate:string='';

    /*=========================================================
        SIDEBAR
    =========================================================*/

    sidebarOpen:boolean=false;

    /*=========================================================
        NOTIFICATIONS
    =========================================================*/

    notifications:any[]=[];

    notificationCount:number=0;

    showNotifications:boolean=false;

    /*=========================================================
        CONSTRUCTOR
    =========================================================*/

    constructor(
    private router: Router,
    private notificationService: NotificationService,
    private pageLoader: PageLoaderService
) {}

    /*=========================================================
        NG ON INIT
    =========================================================*/

    ngOnInit():void{

        this.loadCurrentUser();

        this.setGreeting();

        this.setCurrentDate();

        this.loadNotifications();

    }

    /*=========================================================
        LOAD CURRENT USER
    =========================================================*/

   loadCurrentUser():void{

    this.currentUser = JSON.parse(
        sessionStorage.getItem('user') || '{}'
    );

    console.log("Current User:", this.currentUser);

}

    /*=========================================================
        GREETING
    =========================================================*/

    setGreeting():void{

        const hour=new Date().getHours();

        if(hour<12){

            this.greeting='Good Morning';

        }else if(hour<17){

            this.greeting='Good Afternoon';

        }else{

            this.greeting='Good Evening';

        }

    }

    /*=========================================================
        CURRENT DATE
    =========================================================*/

    setCurrentDate():void{

        this.todayDate=new Date().toLocaleDateString(
            'en-IN',
            {
                weekday:'long',
                day:'numeric',
                month:'long',
                year:'numeric'
            }
        );

    }

    /*=========================================================
        SIDEBAR
    =========================================================*/

    toggleSidebar():void{

        this.sidebarOpen=!this.sidebarOpen;

    }

    closeSidebar():void{

        if(window.innerWidth<=992){

            this.sidebarOpen=false;

        }

    }

    /*=========================================================
        NOTIFICATIONS
    =========================================================*/

   /*=========================================================
    LOAD NOTIFICATIONS
=========================================================*/

loadNotifications(): void {

  this.notificationService.getResidentNotifications()

    .subscribe({

      next: (response: any) => {

        this.notifications = response.notifications;

        this.notificationCount =
          this.notifications.filter(
            (n: any) =>
              !n.readBy?.includes(this.currentUser._id)
          ).length;

      },

      error: (err) => {

        console.log(err);

      }

    });

} /*=========================================================
    TOGGLE NOTIFICATIONS
=========================================================*/
toggleNotifications(): void {

  this.showNotifications = !this.showNotifications;

}  /*=========================================================
    MARK ALL READ
=========================================================*/
markAllRead(): void {

  this.notifications.forEach((notification: any) => {

    if (
      !notification.readBy?.includes(this.currentUser._id)
    ) {

      this.notificationService
        .markAsRead(notification._id)
        .subscribe();

      notification.readBy.push(this.currentUser._id);

    }

  });

  this.notificationCount = 0;

}    
navigateTo(
    route: string,
    title: string,
    subtitle: string,
    icon: string
): void {

    this.closeSidebar();

    this.pageLoader.show(

        title,

        subtitle,

        icon

    );

    setTimeout(() => {

        this.router.navigate([route]);

        this.pageLoader.hide();

    }, 700);

}

/*=========================================================
        LOGOUT
    =========================================================*/

    logout(): void {

    sessionStorage.clear();

    this.router.navigate(
      ['/logout'],
      {
        queryParams: {
          role: 'resident'
        }
      }
    );

}

}