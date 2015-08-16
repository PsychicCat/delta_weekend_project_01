
//create an object constructor for employees
var Employee = function(){
	this.listOut = function(employee){
		return employee.firstname + " " + employee.lastname + ", Employee #" + employee.number + ", " + employee.title + ", Annual Salary: $" + employee.salary.toLocaleString() + " ";
	}
};

//create an object constructor to store employees and other things
var Company = function(){
	this.employees = [],
	this.calcTotalSalary = function(){
		var totalSalary = 0;
		for(var i=0; i <= this.employees.length - 1; i++){
			totalSalary += parseInt(this.employees[i].salary);
		};
		return totalSalary;
	}
};

//create empty company object
var myCompany = new Company();


$(function(){
	//When form is submitted do this...
	$('#employeeInfo').submit(function(e){
		var employee = new Employee;
		var $inputs = $('#employeeInfo :input');
		
		//Loop through each input and create a new property value
		$inputs.each(function(){
				employee[this.name] = $(this).val();
				e.preventDefault();
			});
		
		//append employee to list
		appendEmployee(employee);
	});

	//when Random button is clicked do this...
	$('#random').click(function(){
		var employee = new Employee;
		generateRandomEmployee(employee);
		appendEmployee(employee);
	});


});


//Generate Random Employee
function generateRandomEmployee(employee){
	var firstnames = ['Allan', 'Ben', 'Brook', 'Garrett', 'Jason', 'James', 'Kathryn', 'Kim', 'Kamie', 'Katie', 'Matt', 'Martha', 'Madeleine', 'Liz', 'Shawn', 'Brendan', 'Vas'];
	var lastnames = ['Nielsen', 'Hunt', 'Dalu', 'Lajiness', 'Spidle', 'Nelson', 'McElwain', 'Stoffregen', 'Hayden', 'Kehrwald', 'Whelan', 'Brown', 'Megarry', 'Lowry', 'Piet', 'Fagerstrom', 'Telzrow', 'Leckas'];
	var titles = ['Instructor', 'CEO', 'Student', 'Dog', 'Cat'];

	employee.firstname = firstnames[getRandomValue(0, firstnames.length-1)]
	employee.lastname = lastnames[getRandomValue(0, lastnames.length-1)]
	employee.number = getRandomValue(1000, 2000);
	employee.title = titles[getRandomValue(0, titles.length-1)]
	employee.rating = getRandomValue(1, 5);
	employee.salary = getRandomValue(30000, 99999);
}


//generates a random number between min and max 
function getRandomValue(min, max){
	return Math.round(Math.random() * (max - min) + min);
}


//appends new employee to list
function appendEmployee(employee){

	var $employeeList = $('#employeeList');
	var $newLi = $('<li>');
	var $newSpan = $('<span>');
	var $remove = $('<button class=remove>Remove Employee</button>')

	//set data attribute for employee number
	$newLi.attr('data-id', employee.number);
	$newSpan.text("Review Score: " + employee.rating);
	$newSpan.attr('class', 'score' + employee.rating);
	$newLi.text(employee.listOut(employee));
	$newLi.append($newSpan, $remove);
	$employeeList.append($newLi);

	//push employee object to myCompany array of employees
	myCompany.employees.push(employee);

	//update salary total...
	updateSalary();
	
	//remove employee
	removeEmployee(employee);

}

//removes employee from DOM and myCompany object
function removeEmployee(employee){
		//remove functionality
	$('.remove').click(function(){
		//set variable for employee id you want to remove
		var $id = $(this).parent().data('id');
		//remove the employee object from array
		for (var i=0; i < myCompany.employees.length; i++){
			if(myCompany.employees[i].number == $id){
				console.log("Removing " + myCompany.employees[i].firstname + " " + myCompany.employees[i].lastname);
				myCompany.employees.splice(i, 1);
				console.log("Number of employees listed should be: " + myCompany.employees.length);
			};
		};
		//remove the DOM element
		$(this).parent().remove();

		//update salary total
		updateSalary();


	});
}

//run this to update the sum of all salaries
function updateSalary(){
		//calculates total salary and stores in var
		var totalSalary = (parseInt(myCompany.calcTotalSalary()));
		//adds total to DOM
		$('#salary').text(" $" + totalSalary);
}

