const natural = require('natural');
const jsforce = require('jsforce');
var fs = require('fs');
const { resolve } = require('path');
const { rejections } = require('winston');


const training = async (classifier) => {
  return new Promise((resolve, reject) => {
    if (!classifier) {
      classifier = new natural.BayesClassifier();
    }
  

//let classifier;

/*
try {
  const existingData = fs.readFileSync(`'classifier.json'`, { encoding: 'utf8', flag: 'r' });
  if(existingData == ''){
    console.log('currently empty');
  }else{
  console.log(existingData);
  }
  if (existingData) {
    classifier = natural.BayesClassifier.restore(JSON.parse(existingData));
    console.log('classifier established');
  } else {
    console.log('first');
    classifier = new natural.BayesClassifier();
  }
} catch (error) {
  classifier = new natural.BayesClassifier();
}*/
//const soqlQuery = "SELECT Keyword__c, Category__c FROM Keyword_Category__c";
  //console.log(soqlQuery);

let conn = new jsforce.Connection({
  loginUrl: 'https://dxctechnology-ac-dev-ed.develop.my.salesforce.com'
});
const username = 'aiemailtocase@dxc.com';
const password = 'Salesforce@12345qFEmw8MbarUSElaAMSTXQvby';

conn.login(username, password, async(err, res) => {
  if (err) {
    return console.error(err);
    
  }
  console.log('Connected to Salesforce from train');

  const soqlQuery = "SELECT Keyword__c, Category__c FROM Keyword_Category__c where Category__c IN ('Sales','Hardware','Billing','Software')";
  console.log(soqlQuery);
  const stopwordsQuery = "SELECT Name FROM Stop_Word__c";
  console.log(stopwordsQuery);

  // Run both queries asynchronously
  const queryPromises = [
    conn.query(soqlQuery),
    conn.query(stopwordsQuery)
  ];
  try {
    const [result1, result2] = await Promise.all(queryPromises);

    console.log('reached here1');

    const stopwordsCustomObjectList = result2.records.map(record => record.Name.toLowerCase());

    result1.records.forEach(record => {
      const keyword = record.Keyword__c.toLowerCase();
      const category = record.Category__c;
      classifier.addDocument(keyword, category);
    });

    console.log('  ***  ');
    classifier.train();
    console.log('classifier trained');

    // Resolve with classifier and stopwordsCustomObjectList
    resolve({ classifier, stopwordsCustomObjectList });
  } catch (error) {
    console.error('Error querying Salesforce:', error);
    reject(error);
  }
  /*
  obj1 ={soqlQuery,stopwordsQuery};

 conn.query(obj1,(err, result) => {
    console.log('reached here1');
    if (err) {
      console.log('reached here in error block');
      console.error('Error querying salesforce',err);
      return;
    }
   // console.log(result);
    
    console.log(' --- ');
    

    
  /*conn.query(stopwordsQuery,(err,result)=>{
if(err){
  console.error("Error in stopwords soql query");
  return;
}
 const stopwordsCustomObjectList = result[1].records.map(record => record.Name.toLowerCase());
 console.log('stopwords in train',stopwordsCustomObjectList);
 //}); 


    result[0].records.forEach(record => {
      const keyword = record.Keyword__c.toLowerCase();
      const category = record.Category__c;
      //console.log(keyword);
      classifier.addDocument(keyword, category);
      //console.log(`Added Document: ${keyword} => Category: ${category}`);
    });
    
    console.log('  ***  ');
    classifier.train();
   // console.log(classifier);
    console.log('classifier trained');


    // Set the default category for unclassified keywords
 /*     if (defaultCategory) {
        classifier.events.on('trainedWithDocument', (obj) => {
          if (!obj.doc.category) {
            obj.doc.category = defaultCategory;
          }
        });
      }

    resolve({classifier,stopwordsCustomObjectList});
    
});*/

    
    
 //   console.log(classifier.classFeatures.Hardware);

// const keywordsAndCategories = [];
/*Object.entries(classifier.classFeatures).forEach(([category, features]) => {
  Object.keys(features).forEach(keyword => {
    keywordsAndCategories.push({ keyword, category });
  });
});*/

// Convert the array to JSON string
//const jsonData = JSON.stringify(keywordsAndCategories, null, 2);

// Write the JSON data to the file
//fs.writeFileSync('classifier.json', jsonData, 'utf8');

 //   const classifierJSON = JSON.stringify(classifier.toJSON());
    console.log('reached here at last');
  //  console.log(classifierJSON);
 //   fs.writeFileSync('./classifier.json', classifierJSON,'utf8');
   //   console.log('File Saved?');
    
  });


  
});

};
module.exports={
  training
};