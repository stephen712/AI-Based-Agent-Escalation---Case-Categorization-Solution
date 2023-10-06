//Importing Libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
//const axios = require('axios');
const { getAccessToken } = require('./oauth.js');
const natural = require('natural');
const {nlpMethods} = require('./nlp.js');
const defaultCategory = 'Others'; 
const {training} = require('./train.js');
const {comparison} = require('./comparison.js');


// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your email classification categories
//const categories = ['hardware', 'software', 'billing', 'sales'];

// Handle the incoming HTTP POST request from CloudMailIn 
app.post('/webhook', async(req, res) => {
  
  // Extract the email frm the request body
  const  Subject = req.body.headers.subject;
  const  text = req.body.plain;

  //Text Processing
  const modifiedText = removeExtras(text);

  function removeExtra(text) {
    let substring = text;
    const signatureKeyword = [
      'Regards',
      'Sincerely',
      'Best regards',
      'Best wishes',
      'Yours truly',
      'Yours faithfully',
      'Kind regards',
      'Warm regards',
      'Thanks',
      'Thank you',
      'With gratitude',
      'Cheers',
      'Take care',
      'All the best',
      'Cordially',
      'Respectfully',
      'Faithfully yours',
      'In appreciation',
      'Sincerely yours',
      'Your friend',
      'Your sincerely',
      'Yours respectfully',
      'Yours truly',
      'Much appreciated',
      'Many thanks',
      'Sending you love',
      'God bless',
      'Stay well',
      'Looking forward',
      'Wishing you well',
      'Warmest wishes',
      'Wishing you happiness',
      'Take good care',
      'Until next time',
      'Thinking of you',
      'Wishing you joy',
      'Be well',
      'Peace and love',
      'Stay safe',
      'Hugs and kisses',
      'Your pal',
      'Your chum',
      'Your comrade',
      'Yours ever',
      'Fondly',
      'Affectionately',
      'Forever yours',
      'Your fan',
      'Best',
      'Kindest regards',
      'Warmly',
      'Yours always'
    ];
     // signature keywords starts with
     const greetingKeywords = [
      'Hi',
      'Hello',
      'Hey',
      'Greetings',
      'Salutations',
      'Yo',
      'Hi there',
      'Hello there',
      'Hey there',
      'Good day',
      'Hiya',
      'Hiyah',
      'Howdy',
      'Hi everyone',
      'Hello everyone',
      'Hey everyone',
      'Hi folks',
      'Hello folks',
      'Hey folks',
      'Hi team',
      'Hello team',
      'Hey team',
      'Hi folks',
      'Hello folks',
      'Hey folks',
      'Hi friends',
      'Hello friends',
      'Hey friends',
      'Hi all',
      'Hello all',
      'Hey all',
      'Hi guys',
      'Hello guys',
      'Hey guys',
      'Hi ladies and gentlemen',
      'Hello ladies and gentlemen',
      'Hey ladies and gentlemen',
      'Hi dear',
      'Hello dear',
      'Hey dear',
      'Hi beloved',
      'Hello beloved',
      'Hey beloved',
      'Hi there everyone',
      'Hello there everyone',
      'Hey there everyone',
      'Hi team',
      'Hello team',
      'Hey team',
      'Hi pals',
      'Hello pals',
      'Hey pals',
      'Hi world',
      'Hello world',
      'Hey world'
    ];
    
    const signatureRegex = new RegExp(`\\b(?:${signatureKeyword.join('|')})\\b`, 'i');
    const signatureIndex = text.search(signatureRegex);

    const hiRegex = new RegExp(`\\b(?:${greetingKeywords.join('|')})\\b`, 'i');
    const hiIndex = text.search(hiRegex);


    if (hiIndex !== -1 && signatureIndex !== -1) {
        // If both 'Hi' and the signature keyword are found, remove the content between them and trim the email content
        substring = text.substring(0, hiIndex) + text.substring(hiIndex + 3);
        substring = substring.trim();
        let newsignatureKeyword =  substring.search(new RegExp(`\\b(?:${signatureKeyword.join('|')})\\b`, 'i'));
         substring = substring.substring(0, newsignatureKeyword).trim();
        const modifiedText = substring.replace(/\r?\n/g, ' ');

        return modifiedText;
    } 
    else if (hiIndex !== -1) {
      console.log('Hi found');
        // If only 'Hi' is found, remove the content after it and trim the email content
        const modifiedText = text.substring(0, hiIndex) + text.substring(hiIndex + 3);
        return modifiedText.trim();
    } 
    else if (signatureIndex !== -1) {
        console.log('signature is found');
        // If only the signature keyword is found, remove the content after it and trim the email content
        const modifiedText = text.substring(0, signatureIndex).trim();
        return modifiedText;
    }
  
    // If neither 'Hi' nor the signature keyword is found, process the email as usual
    const startIndex = text.indexOf('\r\n\r\n');
    if (startIndex !== -1) {
      console.log('neither Hi nor signature  found');
      const modifiedText = text.substring(0, startIndex).trim();
      return modifiedText;
    }
    return text;
  }

  function removeExtras(text) {
    let substring = text;
    const signatureKeyword = [
      'Regards',
      'Sincerely',
      'Best regards',
      'Best wishes',
      'Yours truly',
      'Yours faithfully',
      'Kind regards',
      'Warm regards',
      'Thanks',
      'Thank you',
      'With gratitude',
      'Cheers',
      'Take care',
      'All the best',
      'Cordially',
      'Respectfully',
      'Faithfully yours',
      'In appreciation',
      'Sincerely yours',
      'Your friend',
      'Your sincerely',
      'Yours respectfully',
      'Yours truly',
      'Much appreciated',
      'Many thanks',
      'Sending you love',
      'God bless',
      'Stay well',
      'Looking forward',
      'Wishing you well',
      'Warmest wishes',
      'Wishing you happiness',
      'Take good care',
      'Until next time',
      'Thinking of you',
      'Wishing you joy',
      'Be well',
      'Peace and love',
      'Stay safe',
      'Hugs and kisses',
      'Your pal',
      'Your chum',
      'Your comrade',
      'Yours ever',
      'Fondly',
      'Affectionately',
      'Forever yours',
      'Your fan',
      'Best',
      'Kindest regards',
      'Warmly',
      'Yours always'
    ];
     // signature keywords starts with
     const greetingKeywords = [
      'Hi',
      'Hello',
      'Hey',
      'Greetings',
      'Salutations',
      'Yo',
      'Hi there',
      'Hello there',
      'Hey there',
      'Good day',
      'Hiya',
      'Hiyah',
      'Howdy',
      'Hi everyone',
      'Hello everyone',
      'Hey everyone',
      'Hi folks',
      'Hello folks',
      'Hey folks',
      'Hi team',
      'Hello team',
      'Hey team',
      'Hi folks',
      'Hello folks',
      'Hey folks',
      'Hi friends',
      'Hello friends',
      'Hey friends',
      'Hi all',
      'Hello all',
      'Hey all',
      'Hi guys',
      'Hello guys',
      'Hey guys',
      'Hi ladies and gentlemen',
      'Hello ladies and gentlemen',
      'Hey ladies and gentlemen',
      'Hi dear',
      'Hello dear',
      'Hey dear',
      'Hi beloved',
      'Hello beloved',
      'Hey beloved',
      'Hi there everyone',
      'Hello there everyone',
      'Hey there everyone',
      'Hi team',
      'Hello team',
      'Hey team',
      'Hi pals',
      'Hello pals',
      'Hey pals',
      'Hi world',
      'Hello world',
      'Hey world'
    ];
    
    const signatureRegex = new RegExp(`\\b(?:${signatureKeyword.join('|')})\\b`, 'i');
    const signatureIndex = text.search(signatureRegex);

    const hiRegex = new RegExp(`\\b(?:${greetingKeywords.join('|')})\\b`, 'i');
    const hiIndex = text.search(hiRegex);

    if (hiIndex !== -1 && signatureIndex !== -1) {
        // Extract text between greeting and signature keywords
        console.log('Hi & signature both are found');
        substring = text.substring(hiIndex + 3, signatureIndex).trim();
        const modifiedText = substring.replace(/\r?\n/g, ' ');
        //const modifiedText = substring.replace(/[\s,.\n\r]*$/, ' ');
        return modifiedText;
    } 
    else if (hiIndex !== -1) {
        console.log('Hi found');
        // If only 'Hi' is found, remove the content after it and trim the email content
        const modifiedText = text.substring(0, hiIndex) + text.substring(hiIndex + 3);
        return modifiedText.trim();
    } 
    else if (signatureIndex !== -1) {
        console.log('Signature is found');
        // If only the signature keyword is found, remove the content after it and trim the email content
        const modifiedText = text.substring(0, signatureIndex).trim();
        return modifiedText;
    }
  
    // If neither 'Hi' nor the signature keyword is found, process the email as usual
    const startIndex = text.indexOf('\r\n\r\n');
    if (startIndex !== -1) {
        console.log('Neither Hi nor Signature found');
        const modifiedText = text.substring(0, startIndex).trim();
        return modifiedText;
    }
    return text;
}

  
//Classification and NLP:
  const caseData = {
    Subject,
    Email_Intent__c: modifiedText,
    Description: text

  };
  console.log(caseData);
  const classifier = new natural.BayesClassifier();
  //const classifier = await training(null, defaultCategory);
  let classifierr;
  let stopwordsCustomObjectList;
     await training(classifier)
     //.then(trainedClassifier => {
    .then(response => {

    //classifierr = response;
    classifierr = response.classifier;
    stopwordsCustomObjectList = response.stopwordsCustomObjectList;

    console.log(classifierr);
    console.log(stopwordsCustomObjectList);
       
  })
  .catch(error => {
    console.error('error', error);
  });
 let nlpCaseData;
   await nlpMethods(caseData,classifierr,stopwordsCustomObjectList)
  .then(response => {
    console.log('nlp done', response);
    nlpCaseData = response;
       
  })
  .catch(error => {
    console.error('nlp not done', error);
  });

  //Salesforce Integration:
  const salesforceAccessToken =  await getAccessToken();
  const salesforceEndpoint = 'https://dxctechnology-ac-dev-ed.develop.my.salesforce.com/services/data/v58.0/sobjects/Case';

  await   fetch(salesforceEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${salesforceAccessToken}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(nlpCaseData)
        
    })
    .then(response => response.json())
    .then(salesforceResponse =>
      {
        console.log(salesforceResponse);
      //  const salesforceResponse =  response.json();
    console.log('Case created in Salesforce:', salesforceResponse);
    })  
   .catch (error =>{
    console.error('Error creating case in Salesforce:', error);
   }); 
    
  
  // Response to CloudMailIn server
  res.sendStatus(200);
});



// Define an endpoint for Salesforce to send user queries
app.post('/salesforce-webhook', async(req, res) => {
  try {
    // Extract the user query from the request body
    console.log('hit');
   // console.log(req.body.userQueries);
    const userQuery = req.body.userQuery; // This should match the variable name used in Salesforce Flow
    const knowledgeArticles = req.body.knowledgeArticles;
    // Process the user query (add your custom logic here)
    console.log(userQuery);
   // console.log(knowledgeArticles);
    const str = await comparison(userQuery,knowledgeArticles);
    console.log('str'+str);
  
    if(str.score<=0.90){
      res.status(200).json({ knowledgeArticle: 'Assign back to front agent' });
    }
    else if(str.score>0.90){
      console.log('here');
      if(str.knowledgeArticlee.Viewed__c == false  && str.knowledgeArticlee.Category__c == 'Large'){
        console.log('here2');
        res.status(200).json({ knowledgeArticle: 'Assign it to specialist agent' });
      }
      else{
        res.status(200).json({ knowledgeArticle: 'Assign back to front agent' });
      }
     }
     else{
      console.log('kuch bhi nahi chala 2no mei se');
     }


    // Respond with "Thank you from Node"
    
            
    
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Server Start 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});