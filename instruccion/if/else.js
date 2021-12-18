var else_ = /** @class */ (function () {
    function else_(instrucciones,linea, column, tipo) {
        
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    else_.prototype.ejecutar = function (entorno, ast) {
        var retorna=-1
        try {
            this.instrucciones.forEach(instruccion => {
                
                
                    if(instruccion.tipo != tipoInstr.ReturnE && instruccion.tipo != tipoInstr.Call)
                             retorna=   instruccion.ejecutar(entorno,ast)
                    else{
                        
                        retorna = instruccion.ejecutar(entorno,ast)
                       /* if(fn.tipoFuncion==Primitivo.int && typeof retorna =="number"){
                            retorna = re
                        }else if(fn.tipo==Primitivo.String && typeof retorna =="string")
                            retorna = re
                        else if(fn.tipo==Primitivo.boolean && typeof retorna =="boolean")
                            retorna = re
                        */
                            throw BreakException;
                    }
                
            });
        } catch (error) {
            
        }
        
        return retorna
    }
    return else_;
}());