const express = require('express');
const router = express.Router();
//when we separate the routes we need to use routers in different parts to 

const courses = [
	{id:1, name: 'course1'},
	{id:2, name: 'course2'},
	{id:3, name: 'course3'},
];


router.get('/', (req, res) =>{
	res.send([1, 2, 3]);
});

router.get('/:id', (req, res) => {
	const course = courses.find( c => c.id === parseInt(req.params.id));  
	if(!course) {
		res.status(404).send('The course with the given id was not found');// 404
		return;
	}
	res.send(course);
});


router.post('/', (req, res) => {
	
	const result = validateCourse(req.body);
	
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	}
	
	const course = {
		id : courses.length +1,
		name: req.body.name
	};
	
	courses.push(course);
	res.send(course);
});
// PORT 

router.put('/:id', (req, res) =>{
	// look up the course
	// if it doesn't exist return 404
	
	// Validate 
	// if invalid, return 400-bad request
	
	// update course
	// return the updated course
	
	const course = courses.find( c => c.id === parseInt(req.params.id));  
	if(!course){ 
		res.status(404).send('The course with the given id was not found');// 404
		return;
	}
	//res.send(course);
	
	
	const result = validateCourse(req.body);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	}
	
	
	course.name = req.body.name;
		res.send(course);
	//res.send(course);
	
});
router.delete('/:id', (req, res) => {
	const course = courses.find( c => c.id === parseInt(req.params.id));  
	if(!course){ 
		res.status(404).send('The course with the given id was not found');// 404
		return;
	}
	
	const index = courses.indexOf(course);
	courses.splice(index, 1);
	
	res.send(course);

});

function validateCourse(course){
	const schema = {
		name: Joi.string().min(3).required()
	};
	
	return Joi.validate(course, schema);
	
}


module.exports = router;

