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
    var contenido = `
    int var1 = 10;
    int var2 = 20;
    double punteoBasicas = 0.0;
    double declaracion, asignacion, aritmeticas, relacionales, logicas;

    int recursiva_sencilla(int num)
    {
        if (num == 1){
            
            return 1;
        }else{
            return num * recursiva_sencilla(num - 1);
        }
    }
    int recusiva1(int m, int n)
    {    
        print("m", m);
        print("n", n);
        if (m == 0){
            print("ackerman2");
            return n + 1;
        }else if (m > 0 && n == 0){
            print("ackerman3");
            return recusiva1(m - 1, 1);
        }else{
            print("ackerman4");
            return recusiva1(m - 1, recusiva1(m, n - 1));
        }
    }
    void main(){

/*
       double a;
       a=3.0;
       a=4.6;
       int c;

       c=4;
        print(a);
        a=6.5;
        print(a);
        print(toInt("543"));
     int b =3;
     
    
     double val1 = 0.0;
     double val2 = 0.0;
     double val3 = 0.0;
     double a = 0.0;
     double b = 0;
 
     println("El valor defecto de declaracion es 0 = ",declaracion);
     println("El valor defecto de asignacion es 0 = $asignacion y de aritmeticas 0 = $aritmeticas");
     print("Probando ");
     println("Manejo de Entornos");
 
     if(declaracion == 0.0 && asignacion == 0.0 && aritmeticas == 0.0){
         declaracion = declaracion + 0.50; 
     }else{
         declaracion = 0.0;
     }
 
     println("El valor de var1 global es 10=$var1");  //10
     if(var1==10){
         declaracion = declaracion + 0.25; 
     }
 
     int var1 = 5*5;
     println("El valor de var1 local es $var1");  //25
     if(var1==25){
         declaracion = declaracion + 0.25; 
     }
     
     punteoBasicas = -10.0;
     var2 = 40;
     if(punteoBasicas == -10.0 && var2 == 40){
         asignacion =  1;
     }
 
     println("Declaraciones = ",declaracion);
     println("Asignaciones = ",asignacion);
 
     val1 = 7 - (5 + 10 * (20 / 5 - 2 + 4 * (5 + 2 * 3)) +(- 8) * 3 % 2) + 50 * (6 * 2); //142.0
     
     val2 = pow(2,4) +(- 9) * (8+(- 6) * (pow(3,2) +(- 6) * 5 +(- 7) * (9 + pow(7,3)) + 10) +(- 5) ) + 8 * (36 / 6 +(- 5) * ( 2 * 3)); //-133853.0
     
     val3 = (pow(8,3) * pow(8,2) - sqrt(4) + tan(12) + sin(60) + 2) / 3; //10922.353109816746
     double val4 = val1 - val2 + val3; //El resultado es 144917.35310981676
     int resultado = toInt(val4);  //144917
     if(resultado == 144917){
         println("Aritmeticas 100");
         aritmeticas = 1;
     }
*/
     String String_3;
     String String_4;
     int int2_;
     boolean TRUE = true;
     boolean FALSE = false;
     int2_ = 45;
     int2_ = int2_ - 1; 
     println(recursiva_sencilla(15));
     println(recusiva1(3, 8)); 
     
    }
    `;
    //contenido = editor_1.getValue()
    instrucciones =gramatica.parse(contenido);
    const astt = new Ast(instrucciones)
    
  //  grafAst()
    if(Errores.length==0){
         ast =gramatica2.parse(contenido);
       
        ejecutar1(instrucciones, entornoGlobal, astt)
        ejecutar(instrucciones, entornoGlobal, astt)
        console.log(ast)
        console.log(p.produccion)
        console.log(Errores)
        //console.log("TRADUCCION")
      //  getTraduccion(instrucciones)
    }else{
        console.log(Errores)
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