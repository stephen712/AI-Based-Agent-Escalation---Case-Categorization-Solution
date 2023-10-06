
//Importing required modules:
const natural = require('natural');
const fs = require('fs');
const jsforce = require('jsforce');
const { error } = require('console');
const stopWordsList = require('./stopWordsList.json');




/*const test=`The mails are generated based on the culture.
 For example, for Germany's email addresses, we use real 
 German names and the mails will look that belongs to people from Germany.`;*/


const nlpMethods=async(emailData,classifier,stopwordsCustomObjectList) =>{
  return new Promise((resolve,reject) =>{
  
    //tokenize the email matter
    
const body = emailData.Subject +' '+ emailData.Email_Intent__c;
const {WordTokenizer} = natural;
const tokenizer = new WordTokenizer();
const tokens = tokenizer.tokenize(body);
console.log('Tokens');
console.log(tokens);

//less important words removal

/*const stopwordsList = [
 "issue","My","a","able","about","above","abst","according","accordingly","across","act","actually","added","adj","affected","affecting","affects","after","afterwards","again","against","ah","all","almost","alone","along","already","also","although","always","am","among","amongst","an","and","announce","another","any","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","apparently","approximately","are","aren","arent","arise","around","as","aside","ask","asking","at","auth","available","away","awfully","b","back","be","became","because","become","becomes","becoming","been","before","beforehand","begin","beginning","beginnings","begins","behind","being","believe","below","beside","besides","between","beyond","biol","both","brief","briefly","but","by","c","ca","came","can","cannot","can't","cause","causes","certain","certainly","co","com","come","comes","contain","containing","contains","could","couldnt","d","date","did","didn't","different","do","does","doesn't","doing","done","don't","down","downwards","due","during","e","each","ed","edu","effect","eg","eight","eighty","either","else","elsewhere","end","ending","enough","especially","et","et-al","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","except","f","far","few","ff","fifth","first","five","fix","followed","following","follows","for","former","formerly","forth","found","four","from","From","further","furthermore","g","gave","get","gets","getting","give","given","gives","giving","go","goes","gone","got","gotten","h","had","happens","hardly","has","hasn't","have","haven't","having","he","hed","hence","her","here","hereafter","hereby","herein","heres","hereupon","hers","herself","hes","hi","hid","him","himself","his","hither","home","how","howbeit","however","hundred","i","id","ie","if","i'll","im","immediate","immediately","importance","important","in","inc","indeed","index","information","instead","into","invention","inward","is","isn't","it","itd","it'll","its","itself","i've","j","just","k","keep","keeps","kept","kg","km","know","known","knows","l","largely","last","lately","later","latter","latterly","least","less","lest","let","lets","like","liked","likely","line","little","ll","look","looking","looks","ltd","m","made","mainly","make","makes","many","may","maybe","me","mean","means","meantime","meanwhile","merely","mg","might","million","miss","ml","more","moreover","most","mostly","mr","mrs","much","mug","must","my","myself","n","na","name","namely","nay","nd","near","nearly","necessarily","necessary","need","needs","neither","never","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","nor","normally","nos","not","noted","nothing","now","nowhere","o","obtain","obtained","obviously","of","off","often","oh","ok","okay","old","omitted","on","once","one","ones","only","onto","or","ord","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","owing","own","p","page","pages","part","particular","particularly","past","per","perhaps","placed","please","plus","poorly","possible","possibly","potentially","pp","predominantly","present","previously","primarily","probably","promptly","proud","provides","put","q","que","quickly","quite","qv","r","ran","rather","rd","re","readily","really","recent","recently","ref","refs","regarding","regardless","regards","related","relatively","research","respectively","resulted","resulting","results","right","run","s","said","same","saw","say","saying","says","sec","section","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sent","seven","several","shall","she","shed","she'll","shes","should","shouldn't","show","showed","shown","showns","shows","significant","significantly","similar","similarly","since","six","slightly","so","some","somebody","somehow","someone","somethan","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specifically","specified","specify","specifying","still","stop","strongly","sub","substantially","successfully","such","sufficiently","suggest","sup","sure","t","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","thered","therefore","therein","there'll","thereof","therere","theres","thereto","thereupon","there've","these","they","theyd","they'll","theyre","they've","think","this","those","thou","though","thoughh","thousand","throug","through","throughout","thru","thus","til","tip","to","together","too","took","toward","towards","tried","tries","truly","try","trying","ts","twice","two","u","un","under","unfortunately","unless","unlike","unlikely","until","unto","up","upon","ups","us","use","used","useful","usefully","usefulness","uses","using","usually","v","value","various","very","via","viz","vol","vols","vs","w","want","wants","was","wasnt","way","we","wed","welcome","we'll","went","were","werent","we've","what","whatever","what'll","whats","when","whence","whenever","where","whereafter","whereas","whereby","wherein","wheres","whereupon","wherever","whether","which","while","whim","whither","who","whod","whoever","whole","wholl","whom","whomever","whos","whose","why","widely","willing","wish","with","within","without","wont","words","world","would","wouldnt","www","x","y","yes","yet","you","youd","you'll","your","youre","yours","yourself","yourselves","you've","z","zero",
];*/

natural.stopwords = natural.stopwords.concat(stopWordsList);

const filteredTokens = tokens.filter(token=>!natural.stopwords.includes(token));
console.log('Stop Words');
console.log(filteredTokens);   

console.log('Lowercase');
let filteredTokensLowerCase = filteredTokens.map(token => token.toLowerCase());
console.log(filteredTokensLowerCase);
//console.log(stopwordsCustomObjectList);

/*
filteredTokensLowerCase.forEach((word) =>{
  stopwordsCustomObjectList.forEach((value)=>{
    if(value === word){
      var index = filteredTokensLowerCase.indexOf(word);
if (index !== -1) {
  filteredTokensLowerCase.splice(index, 1);
}
    }
  });
});*/
filteredTokensLowerCase = filteredTokensLowerCase.filter((word)=>{
return !stopwordsCustomObjectList.includes(word);
});


console.log(filteredTokensLowerCase);
/*const string = filteredTokens.join(' ');
console.log(typeof(string));

/root/snap//lemmatizing
const arrayLemma = lemmatizer.lemmas(string);

console.log(arrayLemma);
//console.log(typeof(arrayLemma[0]));

//const finalLemma=arrayLemma[0].split(' ');
//console.log(finalLemma);   */

//Stemming the data
//const stemmer = natural.PorterStemmer;
//const final = filteredTokens.map(token => stemmer.stem(token));
//console.log(final);
   


//Case classification
//const classifierr=training(classifier);





//  OTher category work below
let classifiedCategory = '';

  const results = classifier.getClassifications(filteredTokensLowerCase);
  console.log(results);
  /*
  results.forEach((result)=>{
  result.value = parseFloat(result.value.toFixed(5));
  });*/
  console.log(results);
  const diff1 = results[0].value - results[1].value;
  const diff2 = results[1].value - results[2].value;


  //const threshold = 0.00003;
  //diff1  <= threshold && diff2 <= threshold
  console.log(diff1);
  console.log(diff2)
  if(diff1 >= 2*diff2){
    
    classifiedCategory = classifier.classify(filteredTokens);
    
  }else{
    classifiedCategory = 'Unknown';
  }
  
  console.log('Classified Category:');
  console.log(classifiedCategory);
  



let conn = new jsforce.Connection({
    loginUrl: 'https://dxctechnology-ac-dev-ed.develop.my.salesforce.com'
});
const username = 'aiemailtocase@dxc.com';
const password = 'Salesforce@12345qFEmw8MbarUSElaAMSTXQvby';

/*
// Save the keywords into Salesforcee
conn.login(username, password, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to Salesforce from nlp');
  

  const customObjectApi = 'Keyword_Category__c';
  filteredTokens.forEach( keyword =>{
    const customObjectRecord = {
      Keyword__c : keyword,
      Category__c : classifiedCategory,
      Name : keyword
    };

    conn.sobject(customObjectApi).create(customObjectRecord,(err,ret) =>{
      if (err || !ret.success) {
        console.error(err);
        return;
      }
      console.log('Keyword saved in Salesforce:', keyword);
    });
    
  });
});*/





const modifiedEmailData = {
    Subject:emailData.Subject,
    Description:emailData.Description,
    Categories__c:classifiedCategory,
    Email_Intent__c:emailData.Email_Intent__c

  };
resolve(modifiedEmailData);



});
}
module.exports = {
    nlpMethods
  };    