$(document).ready(function(){
	$('ul.tabs li a:first').addClass('active');
	$('.secciones article').hide();
	$('.secciones article:first').show();

	$('ul.tabs li a').click(function(){
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.secciones article').hide();

		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;
	});
});

function setearEditores(id){
	editor = id
    editor =CodeMirror(document.querySelector(id), {
        lineNumbers: true,
        tabSize: 2,
        
        });
}

function parsear(){

	/*
    var contenido = "";

    if(editor=="#editor1"){
        contenido = CodeMirror(document.querySelector(id)).getValue;
    } else if (editor=="#editor1"){
        contenido = editor2.getValue();
    } else if (editor=="#editor1"){
        contenido = editor3.getValue();
    } else if (editor=="#editor8"){
        contenido = CodeMirror(document.querySelector("#editor1")).getValue();
		console.log(contenido)
    } */
    var contenido = `
    
    void main() {
        int[] cadena =[["perro","gato2"], "gato", "ave", "tejón"]
        for letra in [["perro","gato2"], "gato", "ave", "tejón"]
        {
            print(letra & " bonito")   
        }
        
        for num in cadena{
            print(num)
        }
    }
    
    
    `;
    //  console.log(contenido)
	let instrucciones =gramatica.parse(contenido);
    const astt = new Ast(instrucciones)
    const entornoGlobal = new Entorno(null);
    ejecutar(instrucciones, entornoGlobal, astt)
    
    console.log(JSON.stringify(instrucciones) )
}

function ejecutar(instrucciones , entornoGlobal, ast){
    instrucciones.forEach((element) => {
        if(element.length>0){
                ejecutar(element, entornoGlobal, ast)
        }else{
            if(element.tipo == tipoInstr.Main || element.tipo == tipoInstr.Funcion|| element.tipo == tipoInstr.Strutc){
                const nuevoEnt = new Entorno(entornoGlobal)
                element.ejecutar(nuevoEnt, ast)
            }else{
                element.ejecutar(entornoGlobal, ast)
            }
            
        }
        
    });
}