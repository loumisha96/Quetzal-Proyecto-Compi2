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
        //v = simbolo cadena con valor "OLC"
        if(this.arr.length<=0){
            //for animal in "hola"
            //string a recorrer
            var val =this.arr.getValorImplicito(entorno,ast)
            var v = -1
            if(entorno.existe(val)){
                 v = entorno.getSimbolo(val)
            }
            //creo mi variable iteradora
            var simb = new Simbolo(this.tipoDeclaracion, this.id, this.linea, this.column, v.getValorImplicito(entorno, ast))
            entorno.agregar(this.id,simb)
            var vAux =v.getValorImplicito(entorno, ast)
            //recorro el valor y ejecuto instrucciones
            if(typeof vAux  == "string"){
                for(var i=1; i< vAux.length-1; i++){
                    simb.setValor(vAux.charAt(i))
                    this.instrucciones.forEach(instr => {
                        instr.ejecutar(entorno, ast)
                    });
                }
                
            }
        }else{
            //for animal in ["perro", "gato", "ave"]
            var simb = new Simbolo(this.tipoDeclaracion, this.id, this.linea, this.column, null)
            entorno.agregar(this.id,simb)
            if(this.arr.length>0){
                this.arr.forEach(e => {
                    var val = e.getValorImplicito(entorno,ast)
                    simb.setValor(val)
                    this.instrucciones.forEach(instr => {
                        instr.ejecutar(entorno, ast)
                    });
                });
            }else{
                //for animal in arr
                if(typeof this.arr.getValorImplicito(entorno,ast)=="string"){
                    var val = this.arr.getValorImplicito(entorno, ast)
                    if(entorno.existe(val)){
                        var simbArreglo = entorno.getSimbolo(val)
                        var arreglo = simbArreglo.getValorImplicito(entorno,ast)
                        for(var i=0; i<arreglo.length; i++){
                            
                            simb.setValor(arreglo[i].getValorImplicito(entorno,ast))
                            this.instrucciones.forEach(instr => {
                                instr.ejecutar(entorno, ast)
                            });
                            
    
                        }
                    }
                }else{
                    //for animal in arr[2:3]
                    var datos = this.arr.ejecutar(entorno, ast)
                    var inicio = datos[1]
                    var final = datos[2]
                    if(entorno.existe(datos[0])){
                        var simbArreglo = entorno.getSimbolo(datos[0])
                        var arreglo = simbArreglo.getValorImplicito(entorno,ast)
                        for(var i=0; i<arreglo.length; i++){
                            if(i>=inicio && i<=final){
                                simb.setValor(arreglo[i].getValorImplicito(entorno,ast))
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
    return foreach_;
}());