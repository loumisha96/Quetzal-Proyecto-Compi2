var foreach_ = /** @class */ (function () {
    function foreach_(id, arr, instrucciones, linea, column, tipo) {
        this.id = id;
        this.arr = arr;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
       // this.entorno = entorno;

    };
    foreach_.prototype.getTipo=function(){
        return this.tipo
    }
    foreach_.prototype.ejecutar = function(entorno, ast){
        //String cadena="olc"
        //for letra in cadena
        //id = cadena
        //v = simbolo cadena con valor "OLC"   listo
        if(this.arr.length<0){

            if(this.arr.getTipo() ==Valor.cadena){
                //for animal in "hola"
                //string a recorrer
                var val =this.arr.getValorImplicito(entorno,ast)
                
                //creo mi variable iteradora
                var simb = new Simbolo(this.tipo, this.id, this.linea, this.column,val)
                entorno.agregar(this.id,simb)
                
                    for(var i=1; i< val.length-1; i++){
                        simb.setValor(val.charAt(i))
                        this.instrucciones.forEach(instr => {
                            instr.ejecutar(entorno, ast)
                        });
                    }
            }
                
        }else{
            //for animal in ["perro", "gato", "ave"]
            var simb = new Simbolo(this.tipo, this.id, this.linea, this.column, null)
            entorno.agregar(this.id,simb)
            if(this.arr.length>0){
                this.arr.forEach(e => {
                    
                    var val = e.getValorImplicito(entorno,ast)
                  /*  if( val.length>0){
                        for(var i=0; i<val.length; i++){
                            simb.setValor(val[i].getValorImplicito[entorno,ast])
                            this.instrucciones.forEach(instr => {
                                instr.ejecutar(entorno, ast)
                            });
                        }
                        
                        
                   }else{*/
                        simb.setValor(val)
                        this.instrucciones.forEach(instr => {
                            instr.ejecutar(entorno, ast)
                        });
                   // }
                    
                });
            }else{
                //for animal in arr  listo
                if( this.arr.getTipo() ==Valor.id){
                    var val = this.arr.getValor()
                    if(entorno.existe(val)){
                        var simbArreglo = entorno.getSimbolo(val)
                        var arreglo = simbArreglo.getValorImplicito(entorno,ast)
                        for(var i=0; i<arreglo.length; i++){
                            simb.setValor(arreglo[i].getValorImplicito(entorno, ast))

                            if(arreglo[i].expresiones!=undefined && arreglo[i].expresiones.length >0){
                                for(var j=0; j<arreglo[i].expresiones.length; j++){
                                    simb.setValor(arreglo[i].expresiones[j].getValorImplicito(entorno, ast))
                                    this.instrucciones.forEach(instr => {
                                        instr.ejecutar(entorno, ast)
                                        
                                    });
                                }
                                
                            }else{
                                this.instrucciones.forEach(instr => {
                                    instr.ejecutar(entorno, ast)
                                    
                                });
                            }
                            
                            
    
                        }
                    }
                }else{
                    //for animal in arr[2:3]  listo
                    var datos = this.arr.ejecutar(entorno, ast)
                    
                    if(entorno.existe(datos[0])){
                        var simbArreglo = entorno.getSimbolo(datos[0])
                        var arreglo = simbArreglo.getValorImplicito(entorno,ast)
                        var inicio = -1
                        var final = -1
                        if(datos[1]=="begin" && datos[2]=="end"){
                            inicio = 0
                            final = arreglo.length
                        }else{
                             inicio = datos[1]
                             final = datos[2]
                        }
                        
                        for(var i=0; i<arreglo.length; i++){
                            if(i>=inicio && i<=final){
                                simb.setValor(arreglo[i])
                                this.instrucciones.forEach(instr => {
                                    instr.ejecutar(entorno, ast)
                                });
                            }
    
                        }
                    }
                }
                
            }
            
        }
        
        
    }
    foreach_.prototype.recorrer=function(arr){

    }
    return foreach_;
}());