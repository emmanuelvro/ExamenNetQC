$(document).ready(function () {
	jQuery.extend(jQuery.validator.messages, {
		required: "*Campo obligatorio",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
		minlength: jQuery.validator.format("Please enter at least {0} characters."),
		rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
		range: jQuery.validator.format("Please enter a value between {0} and {1}."),
		max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
		min: jQuery.validator.format("Ingresa un numero mayor o igual a {0}.")
	});
	var idioma_español = {
		"sProcessing": "Procesando...",
		"sLengthMenu": "Mostrar _MENU_ registros",
		"sZeroRecords": "No se encontraron resultados",
		"sEmptyTable": "Ningún dato disponible en esta tabla",
		"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
		"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix": "",
		"sSearch": "Buscar:",
		"sUrl": "",
		"sInfoThousands": ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
			"sFirst": "Primero",
			"sLast": "Último",
			"sNext": "Siguiente",
			"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}
	};
	var datatable = $("#tblProductos").DataTable({
		ajax: {
			url: '/api/Products'
		},
		columns: [
			{
				data: "Id",
				autowidth: true
			},
			{
				data: "Name",
				autowidth: true
			},
			{
				data: "Category",
				autowidth: true
			},
			{
				data: "Description",
				autowidth: true
			},
			{
				data: "Price",
				autowidth: true
			},
			{
				data: "Quantity",
				autowidth: true
			},
			{
				autowidth: true,
				render: function (data, type, row) {
					return '<button class="btn btn-primary" title="Editar" data-toggle="modal" data-target="#modalProductos" data-id="' + row.Id + '" id="edit"><i class="fa fa-edit"></i></button> <button class="btn btn-danger" title="Eliminar" data-id="' + row.Id +'" id="delete"><i class="fa fa-trash"></i></button>';
				}
			}

		],
		language: idioma_español,
	});

	

	$("#modalProductos").on('show.bs.modal', function (e) {
		$("#nombre").val('');
		$("#categoria").val('');
		$("#descripcion").val('');
		$("#precio").val('');
		$("#cantidad").val('');
		if (e.relatedTarget.id === "edit") {
			
			var id = $(e.relatedTarget).data('id');
			$("#IdProd").val(id);
			$("#modalProdTitle").html("Editar Producto " + id);

			try {
				
				$.getJSON('/api/products/getbyid/' + id, function (data) {

					$("#nombre").val(data.Name);
					$("#categoria").val(data.Category);
					$("#descripcion").val(data.Description);
					$("#precio").val(data.Price);
					$("#cantidad").val(data.Quantity);
				}); 
			} catch (e) {
				console.log(e);
			}

		}
		else {
			$("#IdProd").val(0);
			$("#modalProdTitle").html("Nuevo Producto");
		}


	});

	$("#tblProductos").on("click", "button#delete", function () {

		Swal.fire({
			title: '¿Esta seguro de eliminar el registro?',
			text: '',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar registro',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
				var id = $(this).data("id");
				$.ajax({
					url: '/api/products/delete/' + id,
					type: 'DELETE',
					dataType: 'json',
					success: function (result) {
						setTimeout(function () {
							location.reload();
						}, 1000);
					}
				});

			}
		});
		

	});
	$("#saveData").click(function () {
		$("#formProd").validate({
			rules:
			{
				nombre:
				{
					required: true,
				},
				categoria:
				{
					required: true,
				},
				descripcion:
				{
					required: true,
				},
				precio:
				{
					required: true,
				},
				cantidad:
				{
					required: true,
				}
			}
		});
		if ($('#formProd').valid()) {
			var data = {
				"Id": $("#IdProd").val(),
				"Name": $("#nombre").val(),
				"Category": $("#categoria").val(),
				"Description": $("#descripcion").val(),
				"Price": $("#precio").val(),
				"Quantity": $("#cantidad").val()
			};
			if ($("#IdProd").val() === "0") {

				$.post("/api/products", data);
				$('#modalProductos').modal('toggle');
				Swal.fire({
					icon: 'success',
					title: 'Ok',
					text: 'Se guardaron los cambios'
				});
				setTimeout(function () {
					location.reload();
				}, 1000);
			} else {
				$.ajax({
					url: '/api/products/update/' + $("#IdProd").val(),
					type: 'PUT',
					contentType: "application/json",
					data: JSON.stringify(data),
					dataType: 'json',
					success: function (result) {
						Swal.fire({
							icon: 'success',
							title: 'Ok',
							text: 'Se guardaron los cambios'
						});
						$('#modalProductos').modal('toggle');
						setTimeout(function () {
							location.reload();
						}, 1000);
					}
				});
			}
		}

	});
});
