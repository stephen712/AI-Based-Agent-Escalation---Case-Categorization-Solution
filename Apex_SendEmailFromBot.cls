public class SendEmailFromBot {

    @InvocableMethod(label='Send Email from Einstein Bot')
    public static void sendEmail(List<InputParameters> inputParams) {
        if (inputParams != null && !inputParams.isEmpty()) {
            InputParameters params = inputParams[0]; // Assuming only one set of input parameters

            // Create a new SingleEmailMessage
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            
            // Set the recipient email address
            email.setToAddresses(new String[] { params.recipientEmail });
            
            // Set the email subject
            email.setSubject(params.emailSubject);
            
            // Set the email body
            email.setPlainTextBody(params.emailBody);
            
            // Send the email
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
        }
    }

    // Inner class to represent the input parameters
    public class InputParameters {
        @InvocableVariable(label='Recipient Email' required=true)
        public String recipientEmail;

        @InvocableVariable(label='Email Subject' required=true)
        public String emailSubject;

        @InvocableVariable(label='Email Body' required=true)
        public String emailBody;
    }
}