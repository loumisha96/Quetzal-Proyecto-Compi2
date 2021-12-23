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


//GLOBALES-----------------------
var k =0;
var Errores = new Array();
var p = new produccion();
var ast=-1;
const entornoGlobal = new Entorno(null);
let instrucciones = null
var tablaS =[]
var salida =""

   //------------------------------         
function setearEditores(id){
	editor = id
    editor =CodeMirror(document.querySelector(id), {
        lineNumbers: true,
        tabSize: 2,
        
        });
}
function grafAst(){
   
    //let ast =gramatica2.parse(contenido);
    graficar(ast)
}

function parsear(){
    instrucciones =[]
    Errores =[]
    p.produccion =[]
    tablaS =[]
    var contenido = editor_1.getValue()
    editor_2.setValue("")
    if (contenido!=""){
        
        instrucciones =gramatica.parse(contenido);
        const astt = new Ast(instrucciones)
        
             ast =gramatica2.parse(contenido);
           
            ejecutar1(instrucciones, entornoGlobal, astt)
            ejecutar(instrucciones, entornoGlobal, astt)
            editor_2.setValue(salida)
        
    }
    
    
    
    
}


function ejecutar(instrucciones , entornoGlobal, ast){
    instrucciones.forEach((element) => {
        if(element.length>0){
                ejecutar(element, entornoGlobal, ast)
        }else{
            if(element.tipo == tipoInstr.Main){
                
                const nuevoEnt = new Entorno(entornoGlobal, "MAIN")
                entornoGlobal.siguiente.push(nuevoEnt)
                element.ejecutar(nuevoEnt, ast)
            }else if(element.tipo!=tipoInstr.Funcion && element.tipo != tipoInstr.Struct){
                element.ejecutar(entornoGlobal, ast)
            }
            
        }
        
    });
}

function ejecutar1(instrucciones, entornoGlobal, ast){
    instrucciones.forEach((element) => {
        if(element.length>0){
              element.forEach(instr => {
                if(instr.tipo == tipoInstr.Funcion ){
                    if(!ast.existeFuncion(instr.getID())){
                        ast.funciones.push(instr)
                    }
                }else if(instr.tipo== tipoInstr.Struct){
                    if(!ast.existeStruct(instr.getID())){
                        ast.structs.push(instr)
                    }
                }
              });
        }else{
            if(element.tipo == tipoInstr.Funcion ){
                if(!ast.existeFuncion(element.getID())){
                    ast.funciones.push(element)
                    
                    
                }
                
            }else if(element.tipo== tipoInstr.Struct){
                if(!ast.existeStruct(element.getID())){
                    ast.structs.push(element)
                    
               
                }
            }
            
        }
        
    });
}

function getTraduccion(instrucciones){
    if(instrucciones!=null){
        instrucciones.forEach(instruccion => {
            if(instruccion.length>0){
               getTraduccion(instruccion)
            }else{
                console.log( instruccion.get3D())
            }
        });
    }
}

function getTemporal(){

}