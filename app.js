const name=document.getElementById("name");
const doj=document.getElementById("doj");
const age=document.getElementById("age");
const designation=document.getElementById("designation"); 
const email=document.getElementById("email"); 
const phone=document.getElementById("phone");
const experience=document.getElementById("experience"); 
const department=document.getElementById("department"); 
const table=document.getElementById("response"); 
const addButton=document.getElementById("sub"); 
const editbutton = document.querySelector("#edit");

let result=[]; 
let i=0;

function loadFromLocal(){
	if(localStorage.getItem("data") != undefined && localStorage.getItem("data") !=""){
		result = JSON.parse(localStorage.getItem("data"));
	} else {
		result = [];
	}
}

addButton.addEventListener("click",(e)=>{ 
	event.preventDefault();
	var objname=name.value; 
	var objdoj=doj.value; 
	var objage=age.value;
	var objdesignation=designation.value;
	var objemail=email.value;  
	var objphone=phone.value; 
	var objexperience=experience.value; 
	var objdepartment=department.value; 
	
	let obj; 
	if(objname!=""&& objdoj!=""&& objage!=""&& objdesignation!=""&& objemail!=""&& objphone!=""&& objexperience!=""&& objdepartment!=""){
		obj={
			id:i,
			name: objname,
			doj: objdoj,
			age: objage,
			designation: objdesignation,
			email: objemail,
			phone:objphone,
			experience:objexperience, 
			department:objdepartment
		} 
		result.push(obj); 
		i++;
		name.value=""; 
		doj.value=""; 
		age.value="";
		designation.value=""; 
		email.value=""; 
		phone.value="";
		experience.value=""; 
		department.value=""; 
	} else{ 
		console.log("no data"); 
	} 
	LoadData(result);
	console.log(result); 
	savelocal(result);
}); 

editbutton.addEventListener("click", function(event) {
	event.preventDefault();
	let id = this.value;
	console.log(id);
	let objname = name.value;
	let objdoj = doj.value;
	let objage = age.value;
	let objdesignation = designation.value;
	let objemail = email.value;
	let objphone = phone.value;
	let objexperience = experience.value;
	let objdepartment = department.value;
	var obj = {
		id:id,
		name:objname,
		doj:objdoj,
		age:objage,
		designation:objdesignation,
		email:objemail,
		phone:objphone,
		experience:objexperience,
		department:objdepartment
	}

	let temp = [];
	for (value of result){
		if (value.id == id)
		{
			temp.push(obj);
		}
		else {
			temp.push(value);
		}
	}
	result=temp;
	LoadData(temp);
	editbutton.classList.add("hide");
	addButton.classList.remove("hide");
	saveLocal(result);		
})

const LoadData=(values)=>{ 
	table.innerHTML=""; 
	var response=""; 
	for(value of values){ 
		response=response+ `<tr><td>${value.name}</td> 
		<td>${value.doj}</td> 
		<td>${value.age}</td>
		<td>${value.designation}</td>
		<td>${value.email}</td>
		<td>${value.phone}</td>
		<td>${value.experience}</td>
		<td>${value.department}</td>
		<td><button onclick=remove(${value.id})>Delete</button>
		<td><button onclick=edit(${value.id})>edit</button></tr>`; 

	} 
	table.innerHTML=response; 
};

function remove(id){
	console.log(id);
	var arr=[];
	for (value of result){
		if (value.id != id){
			arr.push(value);
		}
	}
	result= arr;
	LoadData(arr);
}

function edit(id){
	console.log(id);
	for (value of result){
		if (value.id == id){
			name.value = value.name;
			doj.value = value.doj;
			age.value= value.age;
			designation.value =value.designation;
			email.value = value.email;
			phone.value = value.phone;
			experience.value = value.experience;
			department.value = value.department;
			editbutton.value = value.id;
			editbutton.classList.remove("hide");
			addButton.classList.add("hide");
		}
	}
}


function saveLocal(json){
	localStorage.setItem("data", JSON.stringify(json));
}
loadFromLocal();
LoadData(result);