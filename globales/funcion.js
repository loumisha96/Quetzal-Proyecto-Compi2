var Funcion = /** @class */ (function () {
    function Funcion(tipoFuncion, id, parametros, instrucciones,linea, column, tipo) {
        this.tipoFuncion = tipoFuncion;
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
    };
    return Funcion;
}());