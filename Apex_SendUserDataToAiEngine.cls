public with sharing class SendUserDataToAiEngine {
    public class InputVariables {
        @InvocableVariable(label='User Query' required=true)
        public String userQuery;

        @InvocableVariable(label='Knowledge Articles' required=false)
        public List<Knowledge__kav> knowledgeArticles;
    }

    public class OutputVariables {
        //@InvocableVariable(label='Threshold' required=false)
        //public Decimal threshold;

        @InvocableVariable(label='Knowledge Article' required=false)
      	public String knowledgeArticle;
    }

    @InvocableMethod(label='Call Node.js Endpoint')
    public static List<OutputVariables> callNodeJsEndpoint(List<InputVariables> inputVariablesList) {
        System.debug('hello from dev');
        List<OutputVariables> outputVariablesList = new List<OutputVariables>();

        for (InputVariables inputVariables : inputVariablesList) {
            OutputVariables outputVariables = makeApiCall(inputVariables);
            outputVariablesList.add(outputVariables);
        }

        return outputVariablesList;
    }

    public static OutputVariables makeApiCall(InputVariables inputVariables) {
        OutputVariables outputVariables = new OutputVariables();

        // Prepare the request payload
        Map<String, Object> requestPayload = new Map<String, Object>();
        requestPayload.put('userQuery', inputVariables.userQuery);
     	requestPayload.put('knowledgeArticles', inputVariables.knowledgeArticles);

        // Serialize the payload to JSON
        String requestBody = JSON.serialize(requestPayload);

        // Define the Node.js REST endpoint URL
        String endpointUrl = 'http://34.131.204.108:3000/salesforce-webhook';

        // Initialize the HTTP request
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpointUrl);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setTimeout(60000); // Set an appropriate timeout
        request.setBody(requestBody);

        // Initialize the HTTP response
        Http http = new Http();
        HttpResponse response;

        try {
            // Send the HTTP request
            response = http.send(request);
            System.debug('response');
			System.debug(response);
            // Check if the request was successful (HTTP status code 200)
            if (response.getStatusCode() == 200) {
                // Parse the JSON response
                System.debug(response.getBody());
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
			
                // Populate the output variables
                //outputVariables.threshold = (Decimal) responseMap.get('threshold');
                outputVariables.knowledgeArticle = (String) responseMap.get('knowledgeArticle');
            } else {
                // Handle non-200 status codes (e.g., by logging or throwing an exception)
                System.debug('HTTP request failed with status code: ' + response.getStatusCode());
                // You can add more error handling logic here as needed
            }
        } catch (Exception e) {
            // Handle exceptions (e.g., network issues)
            System.debug('Exception occurred: ' + e.getMessage());
            // You can add more error handling logic here as needed
        }

        return outputVariables;
    }
}