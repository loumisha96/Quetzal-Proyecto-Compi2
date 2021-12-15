var concatenacion = /** @class */ (function () {
    function concatenacion(expr1, expr2, linea, column, tipo) {
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    concatenacion.prototype.getValorImplicito = function(entorno,ast){
        var valor1 = this.expr1.getValorImplicito(entorno,ast)
        if(entorno.existe(valor1)){
            var sim = entorno.getSimbolo(valor1)
            valor1 = sim.getValorImplicito(entorno,ast)
        }
        var valor2 = this.expr2.getValorImplicito(entorno,ast)
        if(typeof valor1 == "string" && typeof valor2== "string"){
            var v = valor1+valor2 

            return v.replaceAll("\"",'')
        }
    }
    return concatenacion;
}());