var Print = /** @class */ (function () {
    function Print(expr, ln, expr2, linea, column, tipo) {
        
        this.expr = expr;
        this.ln = ln;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    Print.prototype.ejecutar = function(entorno, ast){
        var valor =-1
        if(this.expr.tipo == tipoInstr.Call){
            valor = this.expr.ejecutar(entorno,ast)
        }else{
            valor = this.expr.getValorImplicito(entorno, ast)
        }
        if(typeof valor == "object" && entorno.existe(valor) ){
            var sim = entorno.getSimbolo(valor)
            valor =sim.getValorImplicito(entorno, ast)
        }
        var valor2=-1
        if(this.expr2!=null)
             valor2 = this.expr2.getValorImplicito(entorno, ast)
        if(typeof valor2 == "object" && entorno.existe(valor2) ){
            var sim = entorno.getSimbolo(valor2)
            valor2 =sim.getValorImplicito(entorno, ast)
        }
        
        if(this.expr2!=null)
        
            console.log(valor+valor2)
        else
            console.log(valor)
        if(this.ln==1)
            console.log("\n")
        
    }
    return Print;
}());