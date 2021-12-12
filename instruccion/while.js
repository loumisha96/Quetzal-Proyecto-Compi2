var while_ = /** @class */ (function () {
    function while_(condiciones, instrucciones, linea, column, tipo, entorno) {
        this.condiciones = condiciones;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };

    while_.prototype.ejecutar = function(entorno, ast){
        this.condiciones.forEach(cond => {
            var valor = cond.getValorImplicito(entorno,ast)
            if (typeof valor == 'boolean'){
                if(valor){
                    const nuevoEnt = new Entorno(entorno)
                    this.instrucciones.forEach(instruccion => {
                        instruccion.ejecutar(nuevoEnt, ast)
                    });
                    this.ejecutar(entorno, ast)
                }else{
                     return
                }
            }
        });
    }
    return while_;
}());