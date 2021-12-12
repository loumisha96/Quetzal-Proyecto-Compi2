var main = /** @class */ (function () {
    function main(tipoMain, instrucciones, linea, column, tipo) {
        this.tipoMain = tipoMain;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
       // this.entorno = entorno;
    };

    main.prototype.ejecutar = function (ent, ast){
        const nuevoEnt = new Entorno(ent) 
        this.instrucciones.forEach(instruccion => {
                instruccion.ejecutar(ent, ast)
        });
    }



    return main;
}());