var call = /** @class */ (function () {
    function call(id, parametros, linea, column, tipo) {
        this.id = id;
        this.parametros = parametros;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    return call;
}());