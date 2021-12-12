var elseif_ = /** @class */ (function () {
    function elseif_(condiciones, instrucciones, linea, column, tipo) {
        this.condiciones = condiciones;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    elseif_.prototype.ejecutar = function(entorno, ast){
        
        this.condiciones.forEach(cond => {
            var valor = cond.getValorImplicito(entorno, ast)
            if (typeof valor == 'boolean'){
                if(valor){
                    const nuevoEnt = new Entorno(entorno)
                    this.instrucciones.forEach(instruccion => {
                        instruccion.ejecutar(nuevoEnt, ast)
                    });
                }else{
                     const nuevoEnt = new Entorno(entorno)
                     this.elses.forEach(els => {
                        els.ejecutar(nuevoEnt, ast)
                    });
                }
            }
        });
        
    }
    return elseif_;
}());