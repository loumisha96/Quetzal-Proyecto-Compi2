
var arreglo = /** @class */ (function () {
    function arreglo(expr, linea, column) {
        this.expresiones = expr;
        this.linea = linea;
        this.column = column;
        
    };
    arreglo.prototype.getValorImplicito= function(entorno, ast){
        this.expresiones.forEach(e => {
            e.getValorImplicito(entorno, ast)
        });
        return this.expresiones
    }
    return arreglo;
}());