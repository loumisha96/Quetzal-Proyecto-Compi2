var if_ = /** @class */ (function () {
    function if_(condiciones, instrucciones, elses, linea, column, tipo) {
        this.condiciones = condiciones;
        this.instrucciones = instrucciones;
        this.elses = elses;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        

    };
    if_.prototype.ejecutar = function(entorno, ast){
        
        this.condiciones.forEach(cond => {
            var valor = cond.getValorImplicito(entorno,ast)
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
    return if_;
}());