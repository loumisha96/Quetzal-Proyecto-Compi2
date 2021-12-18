var elseif_ = /** @class */ (function () {
    function elseif_(condiciones, instrucciones, linea, column, tipo) {
        this.condiciones = condiciones;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    elseif_.prototype.ejecutar = function(entorno, ast){
        var retorna =-1
        this.condiciones.forEach(cond => {
            var valor = cond.getValorImplicito(entorno, ast)
            if (typeof valor == 'boolean'){
                if(valor){
                    
                    try {
                        this.instrucciones.forEach(instruccion => {
                            if(instruccion.tipo != tipoInstr.ReturnE && instruccion.tipo != tipoInstr.Call)
                                instruccion.ejecutar(entorno,ast)
                            else{
                                retorna = instruccion.ejecutar(entorno,ast)
                               /* if(fn.tipoFuncion==Primitivo.int && typeof retorna =="number"){
                                    retorna = re
                                }else if(fn.tipo==Primitivo.String && typeof retorna =="string")
                                    retorna = re
                                else if(fn.tipo==Primitivo.boolean && typeof retorna =="boolean")
                                    retorna = re*/
                                    throw BreakException;
                            }
                        });
                    } catch (error) {
                        
                    }
                    return retorna
                }else{
                     const nuevoEnt = new Entorno(entorno)
                     this.elses.forEach(els => {
                        els.ejecutar(nuevoEnt, ast)
                    });
                }
            }else{
                Errores.push(new nodoError("Tipo Semántico", "conodición no booleana: " +valor, this.linea, this.column))
            }
        });
        
    }
    return elseif_;
}());