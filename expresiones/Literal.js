var Literal = /** @class */ (function () {
    function Literal(valor, linea, column, tipo) {
        this.valor = valor;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };

    Literal.prototype.getValorImplicito=function(entorno,ast){
        if(this.tipo == Valor.id){
            const sim = entorno.getSimbolo(this.valor)
            const lit = sim.getValor()
            if(typeof lit =="object")
                return lit.getValorImplicito(entorno,ast)
            else
                return lit
        }else if(this.tipo == Valor.negativo){
            if(typeof this.valor =="object")
                return this.valor.getValorImplicito(entorno,ast)*-1
            else
                return lit*-1
        }
        
        return this.valor
    }

    Literal.prototype.getTipo =function(){
        return this.tipo
    }
    Literal.prototype.getValor =function(){
        return this.valor
    }
    Literal.prototype.isNumeric = function (){
        if (this.tipo == Valor.decimal || this.tipo == Valor.digito)
            return true
        else
            return false
    }
    
    Literal.prototype.isLiteral=function(){
        switch (this.tipo) {
            case Valor.cadena:
                return true;
            case Valor.digito:
                return true;
            case Valor.null:
                return true
        
            default:
                return false;
        }
    }
    
    return Literal;
}());