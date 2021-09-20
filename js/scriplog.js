var retrievedData = localStorage.getItem("productos");
var productos = JSON.parse(retrievedData);

populateTable();
//deleteProduct(654);


function Product(codigo,proovedor,nombre,cantidad,precio,fecha){
    this.codigo = codigo,
    this.proovedor = proovedor,
	this.nombre = nombre,
	this.cantidad = cantidad,
    this.precio = precio,
	this.fecha = fecha
}

function addProductArray(){

    var codigo = document.getElementById("idCodigo").value;
    var proovedor = document.getElementById("idProovedor").value;
	var nombre = document.getElementById("idNombre").value;
	var cantidad = document.getElementById("idCantidad").value;
    var precio = document.getElementById("idPrecio").value;
	var fecha = document.getElementById("idDate").value;

    var product = new Product(codigo,proovedor,nombre,cantidad,precio,fecha);

    productos.push(product);
	localStorage.setItem('productos', JSON.stringify(productos));
}


function populateTable(){

    debugger;

    var scriptTable = "";
	var retrievedData = localStorage.getItem("productos");
	var data = JSON.parse(retrievedData);

    for (let index = 0; index < data.length; index++) {
		let codigo = data[index].codigo;
        scriptTable += "<tr>";
        scriptTable += "<td>" + data[index].codigo + "</td>" ;
        scriptTable += "<td>" + data[index].proovedor + "</td>" ;
		scriptTable += "<td>" + data[index].nombre + "</td>" ;
		scriptTable += "<td>" + data[index].cantidad + "</td>" ;
        scriptTable += "<td>" + data[index].precio + "</td>" ;
		scriptTable += "<td>" + data[index].fecha + "</td>" ;
		scriptTable +=
		`
		<td>
		<a href="#" onclick="deleteProduct('${codigo}')" class="btn btn-danger ml-5">Delete</a>
		</td>
		`
        scriptTable += "</tr>";
    }

    document.getElementById("idTableBody").innerHTML = scriptTable

}


function validateFields(){


    if (document.getElementById("idCodigo").value == "") {
        alert("El campo CODIGO no debe quedar vacío");
        return false;
    }

	if (document.getElementById("idProovedor").value == "") {
        alert("El campo Proovedor no debe quedar vacío");
        return false;
    }

    if (document.getElementById("idNombre").value == "") {
        alert("El campo NOMBRE no debe quedar vacío");
        return false;
    }

	if (document.getElementById("idCantidad").value == "") {
        alert("El campo Cantidad no debe quedar vacío");
        return false;
    }

    if (document.getElementById("idPrecio").value == "") {
        alert("El campo PRECIO no debe quedar vacío");
        return false;
    }

	if (document.getElementById("idDate").value == "") {
        alert("El campo Fecha no debe quedar vacío");
        return false;
    }


}

function cleanControls(){

    document.getElementById("idCodigo").value = "";
    document.getElementById("idProovedor").value = "";
	document.getElementById("idNombre").value = "";
	document.getElementById("idCantidad").value = "";
    document.getElementById("idPrecio").value = "";
	document.getElementById("idDate").value = "";

}

var array = [100];

function addProduct(){

    // Validar campos
	

    if (validateFields() == false){
        return false;
    }

    // Agregamos el producto a un arreglo

    addProductArray();


    // Poblamos la tabla

    populateTable();


    // Limpiamos los campos
    cleanControls();


}





document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let idcod = document.getElementById('idcod').value;
  let title = document.getElementById('title').value;
  let can = document.getElementById('can').value;
  let precio = document.getElementById('precio').value;
  let proovedor = document.getElementById('proovedor').value;
  let date = document.getElementById('date').value;
  let description = document.getElementById('description').value;
  console.log(description)

  let task = {
	idcod,
    title,
	can,
	precio,
	proovedor,
	date,
    description
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}




function deleteProduct(codigo) {
	console.log('test');
	let productosArray = JSON.parse(localStorage.getItem('productos'));
	for(let i = 0; i < productosArray.length; i++) {
	  if(productosArray[i].codigo == codigo) {
		productosArray.splice(i, 1);
	  }
	}

	localStorage.setItem('productos', JSON.stringify(productosArray));
	populateTable();
}

function getTasks() {
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	let tasksView = document.getElementById('tasks');
	var table = "";
	tasksView.innerHTML = '';
	for(let i = 0; i < tasks.length; i++) {
		let idcod = tasks[i].idcod;
		let title = tasks[i].title;
		let can = tasks[i].can;
		let precio = tasks[i].precio;
		let proovedor = tasks[i].proovedor;
		let date = tasks[i].date;
		let description = tasks[i].description;
	
		table += "<tr>";
		table += "<td>" + idcod + "</td>" ;
		table += "<td>" + title + "</td>" ;
		table += "<td>" + can + "</td>" ;
		table += "<td>" + precio + "</td>" ;
		table += "<td>" + proovedor + "</td>" ;
		table += "<td>" + date + "</td>" ;
		table += "<td>" + description + "</td>" ;
		table +=
		`
		<td>
		<a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
		</td>
		`
		table += "</tr>";
  
	}

	document.getElementById("idTableBod").innerHTML = table

  }



getTasks();
