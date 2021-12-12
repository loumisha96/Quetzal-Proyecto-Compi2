var for_ = /** @class */ (function () {
    function for_(var1, var2, var3, instrucciones, linea, column, tipo, entorno) {
        this.var1 = var1;
        this.var2 = var2;
        this.var3 = var3;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };

    for_.prototype.ejecutar= function(entorno, ast){
        this.var1.ejecutar(entorno, ast)
        var v2 = this.var2.getValorImplicito(entorno, ast)
        while(v2){
            if (typeof v2 == 'boolean'){
                if(v2){
                    const nuevoEnt = new Entorno(entorno)
                    this.instrucciones.forEach(instruccion => {
                        instruccion.ejecutar(nuevoEnt, ast)
                    });
                    this.var3.ejecutar(entorno,ast)
                    v2 = this.var2.getValorImplicito(entorno, ast)
                }else{
                     return
                }
            }
        }
    }

    return for_;
}());