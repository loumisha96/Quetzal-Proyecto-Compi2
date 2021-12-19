var call = /** @class */ (function () {
    function call(id, parametros, linea, column, tipo) {
        
        this.id = id;
        this.parametros = parametros;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    call.prototype.ejecutar = function(entorno,ast){
        var retorna=-1
        if(ast.existeFuncion(this.id)){
            const fn = ast.getFuncion(this.id)
            const nuevoE = new Entorno(entorno)
            fn.ejecutar(nuevoE,ast)
            var listaValores = []
            if(fn.parametros.length == this.parametros.length){
                for(var i=0; i< fn.parametros.length; i++){
                   // console.log("akmvda", this.parametros[i].getValorImplicito(nuevoE,ast))
                   if(this.parametros[i].tipo == tipoInstr.Call){
                       // console.log("asignado parametros", this.parametros[i].ejecutar(entorno,ast))
                        listaValores.push(this.parametros[i].ejecutar(entorno,ast))
                   }else{
                       // console.log("asignado parametros", this.parametros[i].getValorImplicito(entorno,ast))
                       
                        listaValores.push(this.parametros[i].getValorImplicito(entorno,ast))
                    }
                        
                   /* var sim = entorno.getSimbolo(fn.parametros[i].id)
                    sim.setValor(this.parametros[i])*/
                }
            }
            if(fn.parametros.length == this.parametros.length){
                for(var i=0; i< fn.parametros.length; i++){
                    nuevoE.reemplazar(fn.parametros[i].id,listaValores[i] )
                }
            }
            try {
                fn.instrucciones.forEach(instr => {

                    if(instr.tipo != tipoInstr.ReturnE && instr.tipo != tipoInstr.Call)
                        retorna =instr.ejecutar(nuevoE,ast)
                    else{
                        
                        var re = instr.ejecutar(nuevoE,ast)
                        if(fn.tipoFuncion==Primitivo.int && typeof re =="number"){
                            retorna = re
                        }else if(fn.tipoFuncion==Primitivo.String && typeof re =="string")
                            retorna = re
                        else if(fn.tipoFuncion==Primitivo.boolean && typeof re =="boolean")
                            retorna = re
                        else
                            Errores.push(new nodoError("Tipo Semántico", "Funcion retorna tipo no valido " +this.id,"llamada a funcion", this.linea, this.column))
                            throw BreakException;
                        }
                });
            } catch (error) {
                
            }
            
        }else{
            Errores.push(new nodoError("Tipo Semántico", "Funcion no creada id: " +this.id, this.linea, this.column))
        }
        return retorna
    }
    return call;
}());