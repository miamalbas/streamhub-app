export class EventDto {
    
    eventId: string;
    eventType: string;
    eventData: any; 
    priority: string;
  
    constructor(eventId: string, eventType: string, eventData: any) {
      this.eventId = eventId;
      this.eventType = eventType;
      this.eventData = eventData;
    }
  }
  