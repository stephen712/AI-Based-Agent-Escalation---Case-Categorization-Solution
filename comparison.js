
const comparison = async(userQuery,knowledgeArticles) =>{
return new Promise((resolve,reject)=>{

  const fetch = require('node-fetch');


  const apiUrl = 'https://api-inference.huggingface.co/models/sentence-transformers/msmarco-distilbert-base-tas-b';
  const apiToken = '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'; 
  const sentences = knowledgeArticles.map((article) => article.Title + ' ' + article.Summary);
  console.log('sentences xxxxxxxxxxxx'+sentences);
  const requestData = {
    inputs: {
      source_sentence: userQuery,
      sentences: sentences,
    },
  };
  
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
    //  let knowledgeArticle;
      console.log('data '+data);
      //const similarityScores = data[0].scores;
      //console.log('simi'+similarityScores);
      const maxScoreIndex = data.indexOf(Math.max(...data));
      const knowledgeArticle = knowledgeArticles[maxScoreIndex];
      console.log(knowledgeArticle);

        // Resolve with the knowledge article that matches the most
        const result = {
          knowledgeArticlee: knowledgeArticle,
          score: data[maxScoreIndex],
        }
        //console.log('knowledgeAeticle'+knowledgeArticle.);
        console.log('KA result'+result.knowledgeArticlee.Title);
        console.log('result'+result.score);
        resolve(result);

    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });

});



};
module.exports={
  comparison
};
