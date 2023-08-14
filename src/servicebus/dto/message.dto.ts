export class MessageDto {
 
    messageId: string;
    messageData: any; 
  
    constructor(messageId: string, messageData: any) {
      this.messageId = messageId;
      this.messageData = messageData;
    }
  }
  