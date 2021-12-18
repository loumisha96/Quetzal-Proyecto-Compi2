var Return = /** @class */ (function () {
    function Return(Expr, linea, column, tipo){
        
        this.Expr = Expr;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
    }
    Return.prototype.ejecutar = function(entorno, ast){
        var retorna=-1
        if(this.Expr!=null){
            if(this.Expr.tipo==tipoInstr.Call)
                retorna = this.Expr.ejecutar(entorno, ast)
            else
                retorna= this.Expr.getValorImplicito(entorno,ast)
        }
        return retorna
    }
    return Return;
}());