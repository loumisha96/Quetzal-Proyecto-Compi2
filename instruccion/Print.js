var Print = /** @class */ (function () {
    function Print(expr, ln, linea, column, tipo) {
        this.expr = expr;
        this.ln = ln;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    Print.prototype.ejecutar = function(entorno, ast){
        var valor = this.expr.getValorImplicito(entorno, ast)
        if(typeof valor == "string" && entorno.existe(valor) ){
            var sim = entorno.getSimbolo(valor)
            
            console.log(sim.getValorImplicito(entorno, ast))
        }else{
            console.log(valor)
        }
        
    }
    return Print;
}());