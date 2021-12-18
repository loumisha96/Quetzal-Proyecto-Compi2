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
var k =0;
    var Errores = new Array();

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
var ast=-1;
const entornoGlobal = new Entorno(null);
function parsear(){

    var contenido = `
    
    int ackermann(int m, int n)
    {
        
        print("parametros recibo")
        print("m", m)
        print("n", n)
        print("num", num)
        num++

        if (m == 0) {
            print(1)
            return (n + 1)
        } else if (m > 0 && n == 0) {
            print(2)
            return ackermann(m - 1, 1)
        } else {
            print(3)
            return ackermann(m - 1, ackermann(m, n - 1))
        }
    }

    int funss (int m, int n){
        if (m == n){
            print("Aqui voy")
            m =m+n
            return 2
        }else{
            print("Aqui voy Else")
            return funss(m,funss(5,5))
        }
        
       
    }

    int hanoi( int discos, int origen, int auxiliar, int destino)
    {
        if (discos == 1){
            print(" if- mover de ", origen)
           // print("a ", destino)
           // print("Mover de " & origen & " a " & destino)
        }else{
            int ds = discos -1
            hanoi(discos - 1, origen, destino, auxiliar)
            print("else - mover de ", origen)
            print("a ", destino)
            //print("Mover de " & origen & " a " & destino)
            hanoi(ds, auxiliar, origen, destino)
        }
        return 1
    }
    int factorial(int num)
    {
        if (num == 1){
            return 1
        }else{
            return num * factorial(num - 1)
        }
    }
    void main() {
        print(factorial(5))
      //  hanoi(3,1,2,3)
	}
    
    
    `;
    let instrucciones =gramatica.parse(contenido);
    const astt = new Ast(instrucciones)
    
  //  grafAst()
    if(Errores.length==0){
       //  ast =gramatica2.parse(contenido);
       
        ejecutar1(instrucciones, entornoGlobal, astt)
        ejecutar(instrucciones, entornoGlobal, astt)
        console.log(Errores)
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
                const nuevoEnt = new Entorno(entornoGlobal)
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