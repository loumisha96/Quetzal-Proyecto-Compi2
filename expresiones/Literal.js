var Literal = /** @class */ (function () {
    function Literal(valor, linea, column, tipo) {
        this.valor = valor;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };

    Literal.prototype.getValorImplicito=function(){
        return this.valor
    }

    Literal.prototype.getTipo =function(){
        return this.tipo
    }
    Literal.prototype.isNumeric = function (){
        if (this.tipo == Valor.decimal || this.tipo == Valor.digito)
            return true
        else
            return false
    }
    return Literal;
}());