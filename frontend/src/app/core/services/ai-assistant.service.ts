import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {

  constructor() { }

  /*=========================================================
      GET AI RESPONSE
  =========================================================*/

  getAnswer(question: string): string {

    const q = question.toLowerCase().trim();

    /*=====================================================
        GREETINGS
    =====================================================*/

    if (this.hasKeyword(q, [
      'hi',
      'hello',
      'hey',
      'good morning',
      'good afternoon',
      'good evening',
      'namaste'
    ])) {

      return this.greetingResponse();

    }

    /*=====================================================
        THANK YOU
    =====================================================*/

    if (this.hasKeyword(q, [
      'thanks',
      'thank you',
      'thx'
    ])) {

      return this.thankYouResponse();

    }

    /*=====================================================
        GOODBYE
    =====================================================*/

    if (this.hasKeyword(q, [
      'bye',
      'goodbye',
      'see you'
    ])) {

      return this.goodByeResponse();

    }

    /*=====================================================
        VISITORS
    =====================================================*/

    if (this.hasKeyword(q, [
      'visitor',
      'visitors',
      'guest',
      'entry',
      'enter',
      'delivery'
    ])) {

      return this.visitorResponse();

    }

    /*=====================================================
        REGISTRATION
    =====================================================*/

    if (this.hasKeyword(q, [
      'register',
      'registration',
      'join',
      'become resident',
      'new resident'
    ])) {

      return this.registrationResponse();

    }

    /*=====================================================
        LOGIN
    =====================================================*/

    if (this.hasKeyword(q, [
      'login',
      'dashboard',
      'resident portal',
      'sign in'
    ])) {

      return this.loginResponse();

    }

    /*=====================================================
        MAINTENANCE
    =====================================================*/

    if (this.hasKeyword(q, [
      'maintenance',
      'bill',
      'payment',
      'pay'
    ])) {

      return this.maintenanceResponse();

    }

    /*=====================================================
        COMPLAINT
    =====================================================*/

    if (this.hasKeyword(q, [
      'complaint',
      'problem',
      'issue',
      'water leakage',
      'electricity'
    ])) {

      return this.complaintResponse();

    }

    /*=====================================================
        RULES
    =====================================================*/

    if (this.hasKeyword(q, [
      'rule',
      'rules',
      'guideline',
      'policy'
    ])) {

      return this.rulesResponse();

    }

    /*=====================================================
        NOTICE
    =====================================================*/

    if (this.hasKeyword(q, [
      'notice',
      'announcement'
    ])) {

      return this.noticeResponse();

    }

    /*=====================================================
        EVENTS
    =====================================================*/

    if (this.hasKeyword(q, [
      'event',
      'festival',
      'celebration',
      'ganesh'
    ])) {

      return this.eventResponse();

    }

    /*=====================================================
        SECURITY
    =====================================================*/

    if (this.hasKeyword(q, [
      'security',
      'safe',
      'guard',
      'cctv'
    ])) {

      return this.securityResponse();

    }

    /*=====================================================
        PARKING
    =====================================================*/

    if (this.hasKeyword(q, [
      'parking',
      'vehicle',
      'bike',
      'car'
    ])) {

      return this.parkingResponse();

    }

    /*=====================================================
        AMENITIES
    =====================================================*/

    if (this.hasKeyword(q, [
      'amenities',
      'facility',
      'facilities',
      'gym',
      'garden',
      'play area',
      'children',
      'lift'
    ])) {

      return this.amenitiesResponse();

    }

    /*=====================================================
        LOCATION
    =====================================================*/

    if (this.hasKeyword(q, [
      'location',
      'address',
      'where',
      'located',
      'pune'
    ])) {

      return this.locationResponse();

    }

    /*=====================================================
        ABOUT SOCIETY
    =====================================================*/

    if (this.hasKeyword(q, [
      'about',
      'society',
      'vighnahar',
      'who are you',
      'introduce'
    ])) {

      return this.aboutResponse();

    }

    /*=====================================================
        CONTACT
    =====================================================*/

    if (this.hasKeyword(q, [
      'contact',
      'help',
      'administrator',
      'office'
    ])) {

      return this.contactResponse();

    }

    return this.defaultResponse();

  }

  /*=========================================================
      KEYWORD MATCH
  =========================================================*/

  private hasKeyword(question: string, keywords: string[]): boolean {

    return keywords.some(keyword =>
      question.includes(keyword.toLowerCase())
    );

  }
  /*=========================================================
    GREETING RESPONSE
=========================================================*/

private greetingResponse(): string {

  return `👋 Hello!

Welcome to **Vighnahar Residence**.

I'm **Vighnahar AI Assistant**.

I can help you with information about:

🏡 Society

📝 Registration

🚪 Visitors

💳 Maintenance

🛠 Complaints

📢 Notices

🎉 Events

📘 Society Rules

🛡 Security

🚗 Parking

Feel free to ask me anything!`;

}
/*=========================================================
    ABOUT SOCIETY
=========================================================*/

private aboutResponse(): string {

  return `🏡 Vighnahar Residence is a modern residential community located in Pune, Maharashtra.

Established in the early 2020s, our society provides a peaceful, secure and family-friendly environment.

Residents enjoy:

✔ Beautiful landscaped gardens

✔ Children's play area

✔ Community events

✔ Premium amenities

✔ 24×7 Security

✔ CCTV Surveillance

✔ Clean and well-maintained surroundings

Vighnahar Residence is more than just a housing society—it is a community where families grow together and enjoy a better lifestyle.`;

}
/*=========================================================
    LOCATION
=========================================================*/

private locationResponse(): string {

  return `📍 Vighnahar Residence is located in Pune, Maharashtra.

It is a secure gated residential community offering modern facilities, safety and a peaceful living environment for families.`;

}
/*=========================================================
    AMENITIES
=========================================================*/

private amenitiesResponse(): string {

  return `🏡 Our society offers the following amenities:

✔ Landscaped Gardens

✔ Children's Play Area

✔ Community Hall

✔ Visitor Parking

✔ Resident Parking

✔ Lift Facility

✔ CCTV Surveillance

✔ 24×7 Security

✔ Walking Track

✔ Power Backup

✔ Continuous Water Supply

✔ Clean & Well Maintained Premises`;

}
/*=========================================================
    VISITOR
=========================================================*/

private visitorResponse(): string {

  return `🚪 Yes, visitors are allowed to enter Vighnahar Residence.

However, for the safety of all residents:

✔ Every visitor must submit an entry request.

✔ The concerned resident receives the request.

✔ The resident can Approve or Reject the visitor.

✔ Only approved visitors are allowed to enter the society.

This visitor approval system helps maintain a safe and secure environment for everyone.`;

}
/*=========================================================
    REGISTRATION
=========================================================*/

private registrationResponse(): string {

  return `📝 Registration is available only for residents of Vighnahar Residence.

The registration process is:

1️⃣ Fill the registration form.

2️⃣ Society Administrator verifies your details.

3️⃣ Once approved, your account becomes active.

4️⃣ You can then log in using your Email ID and Password.

Visitors cannot register on the website.`;

}

/*=========================================================
    LOGIN
=========================================================*/

private loginResponse(): string {

  return `🔐 Residents can log in only after their registration has been approved by the Society Administrator.

Use your registered Email ID and Password to access your Resident Dashboard.`;

}
/*=========================================================
    MAINTENANCE
=========================================================*/

private maintenanceResponse(): string {

  return `💳 Residents can manage maintenance through the Resident Dashboard.

You can:

✔ View maintenance bills

✔ Pay maintenance online

✔ Upload payment receipt

✔ Track payment status

Every submitted payment is verified by the Society Administrator before it is marked as Paid.`;

}
/*=========================================================
    COMPLAINT RESPONSE
=========================================================*/

private complaintResponse(): string {

  return `🛠 Residents can raise complaints related to:

✔ Water Supply

✔ Electricity

✔ Lift Issues

✔ Cleanliness

✔ Parking

✔ Security

✔ Common Area Maintenance

After submitting a complaint, the Society Administrator reviews it and updates its status until it is resolved.`;

}

/*=========================================================
    RULES RESPONSE
=========================================================*/

private rulesResponse(): string {

  return `📘 Residents can view the latest Society Rules & Guidelines from their Resident Dashboard.

These guidelines help maintain:

✔ Cleanliness

✔ Safety

✔ Parking Discipline

✔ Noise Control

✔ Community Harmony

Residents are requested to follow all society rules for a peaceful living environment.`;

}

/*=========================================================
    NOTICE RESPONSE
=========================================================*/

private noticeResponse(): string {

  return `📢 Society notices are published by the Society Administrator.

Residents can view notices regarding:

✔ Maintenance

✔ Water Supply

✔ Electricity Shutdown

✔ Meetings

✔ Events

✔ Important Announcements

All notices are available in the Resident Dashboard.`;

}

/*=========================================================
    EVENT RESPONSE
=========================================================*/

private eventResponse(): string {

  return `🎉 Vighnahar Residence regularly organizes community events such as:

🎊 Festival Celebrations

🎨 Cultural Programs

👨‍👩‍👧 Family Gatherings

🎯 Community Activities

Residents can view upcoming events from their dashboard.`;

}

/*=========================================================
    SECURITY RESPONSE
=========================================================*/

private securityResponse(): string {

  return `🛡 Vighnahar Residence prioritizes resident safety through:

✔ 24×7 Security Guards

✔ CCTV Surveillance

✔ Gated Entry

✔ Visitor Verification

✔ Resident Visitor Approval System

These measures help provide a safe and secure living environment.`;

}

/*=========================================================
    PARKING RESPONSE
=========================================================*/

private parkingResponse(): string {

  return `🚗 Separate parking spaces are available for residents.

The society also provides designated visitor parking.

Residents are requested to park only in their allotted parking space and follow society parking rules.`;

}

/*=========================================================
    CONTACT RESPONSE
=========================================================*/

private contactResponse(): string {

  return `☎ For any assistance, residents can contact the Society Administrator through the Resident Dashboard after logging in.

For registration-related queries, please wait until your registration request has been verified by the administrator.`;

}

/*=========================================================
    THANK YOU RESPONSE
=========================================================*/

private thankYouResponse(): string {

  return `😊 You're most welcome!

I'm always happy to help you with information about Vighnahar Residence.

Have a wonderful day!`;

}

/*=========================================================
    GOODBYE RESPONSE
=========================================================*/

private goodByeResponse(): string {

  return `👋 Thank you for visiting Vighnahar Residence.

We hope to see you again soon.

Have a great day!`;

}

/*=========================================================
    DEFAULT RESPONSE
=========================================================*/

private defaultResponse(): string {

  return `🤖 Sorry, I couldn't understand your question.

You can ask me about:

🏡 Society Information

📍 Society Location

📝 Registration

🔐 Resident Login

🚪 Visitors

💳 Maintenance

🛠 Complaints

📢 Notices

🎉 Events

📘 Society Rules

🛡 Security

🚗 Parking`;

}
}