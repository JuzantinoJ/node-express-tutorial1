//using express dependecies
const express = require('express');
//create a webserver
const server = express();
const shortid = require('shortid')

server.use(express.json())

//declare a port
const port = 5001;

//creating a mock database
let questions = [];
let answers = [];
    

    
//setting up different route 
//get() method from express is to retrieve information
// req = request res = response (both are objects) they will return us something
// this is setting up a 'GET' endpoint
server.get('/', (req, res) => {
    res.json({ note: 'Hello World' })
});

//creating another route
// server.get('/question', (req, res) => {
//     res.json({ welcome: "Ask me a question!"})
// })

//setting up a post request
server.post('/question', (req, res) => {
    const questionInfo = req.body;
    questionInfo.id = shortid.generate();
    questions.push(questionInfo)
    res.status(201).json(questionInfo)
})

//get an endpoint 
server.get('/question', (req, res) => {
    res.status(200).json(questions)
})

server.post('/answer', (req, res) => {
    const answerInfo = req.body
    answerInfo.id = shortid.generate();
    answers.push(answerInfo)
    res.status(201).json(answerInfo)
})


server.get('/answer', (req, res) => {
    res.status(200).json(answers)
})
    

//create a delete endpoint / /:id - this will find a specific id to delete that record
//const {id} is deconstructed. An object containing parameter values parsed from the 
//URL path.For example if you have the route / user /: name, then the "name" from the 
//URL path wil be available as req.params.name.
server.delete("/question/:id", (req, res) => {
    const { id } = req.params;
    //deleted var is looking for a questions, from questions.id , and return the question if found
    // 
    const deleted = questions.find(question => question.id === id);
    //if the record exist , or return truthy filter and find the id
    //else if doesnt exist, a 404 will be returned
    if (deleted) {
        questions = questions.filter(question => question.id !== id);
        res.status(200).json(deleted)
        
    } else {
        res
            .status(404)
            .json({ message: 'Question does not exist' })
    }
})

//delete answer. IMPT - do not forget to put the res status
server.delete("/answer/:id", (req, res) => {
    const { id } = req.params;
    const deletedAns = answers.find(answer => answer.id === id);
    if (deletedAns) {
        answers = answers.filter(answer => answer.id !== id);
        res.status(200).json(deletedAns)
    } else {
        res.status(404)
        .json({ message: "Answer does not exist"})
    }
    })

    //looking for a specific question
server.get("/question/:id", (req, res) => {
    const { id } = req.params;
    const found = questions.find(question => question.id === id);
    
    if (found) {
        res.status(200).json(found)        
    } else {
        res.status(404).json({message: "Question does not exist"})
    }
    })

server.get("/answer/:id", (req, res) => {
    const { id } = req.params;
    const foundAns = answers.find(answer => answer.id === id);
    if (foundAns) {
        res.status(200).json(foundAns)
    } else {
        res.status(404).json({message: 'Answer not found'})
    }
})


// put = update or change data in question
// using put u need to put all the info if not it will be wiped out if just changing one object
server.put("/question/:id", (req,res)=> {
    const { id } = req.params;
    //var changes hold the record of changes using req.body containing the change
    const changes = req.body;
    //finding the index for us to change using findIndex() method
    const index = questions.findIndex(question => question.id === id);
    //if index is not below 0, using -1, return the changes done
    if (index !== -1) {
        questions[index] = changes;
        res
            .status(200)
            .json(changes)
    } else {
        res
            .status(404)
            .json({ message: 'Question not found' })
    }

})

// patch is more efficient
server.patch('/answer/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    const found = answers.find(answer => answer.id === id);
    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "Answer not found"})
    }
})


//listening to the port/ listen() method from express
server.listen(5001, () => {
    console.log(`Server running on port ${port}`)
});

/*summary - An API is a server. When a client types a http(url) request, that request 
will go through a cloud(internet) to a server and returns a response 
of the url requested to the client.*/

//RESOURCE FROM YOUTUBE CHANNEL : 
// https://www.youtube.com/watch?v=P4IJUii5czw&list=PLKii3VqdFnoYhqEl3VPBg2DA6Aokrhexi&index=5