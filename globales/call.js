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
            fn.ejecutar(entorno,ast)
            if(fn.parametros.length == this.parametros.length){
                for(var i=0; i< fn.parametros.length; i++){
                    var sim = entorno.getSimbolo(fn.parametros[i].id)
                    sim.setValor(this.parametros[i])
                }
            }
            try {
                fn.instrucciones.forEach(instr => {

                    if(instr.tipo != tipoInstr.ReturnE && instr.tipo != tipoInstr.Call)
                        retorna =instr.ejecutar(entorno,ast)
                    else{
                        var re = instr.ejecutar(entorno,ast)
                        if(fn.tipoFuncion==Primitivo.int && typeof retorna =="number"){
                            retorna = re
                        }else if(fn.tipo==Primitivo.String && typeof retorna =="string")
                            retorna = re
                        else if(fn.tipo==Primitivo.boolean && typeof retorna =="boolean")
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