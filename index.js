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
    int a=7
    int b = 2
    int c = b
    String animal = "perro"
    
    void main (){
        for(int i =0; i<5; i++){
            print(i)
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
            if(element.tipo == tipoInstr.Main || element.tipo == tipoInstr.Funcion){
                const nuevoEnt = new Entorno(entornoGlobal)
                element.ejecutar(nuevoEnt, ast)
            }else{
                element.ejecutar(entornoGlobal, ast)
            }
            
        }
        
    });
}