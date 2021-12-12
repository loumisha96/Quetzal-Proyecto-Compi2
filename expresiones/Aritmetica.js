
var Aritmetica = /** @class */ (function () {
    function Aritmetica(expr1, op, expr2, linea, column, tipo) {
        this.expr1 = expr1;
        this.operador = op;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.valor = null;
        
    };
    Aritmetica.prototype.getTipo = function(){
        return this.tipo
    }

    Aritmetica.prototype.getValor = function(entorno, ast, expr){
        var val =expr.getValorImplicito()
        if(typeof val == "string"  ){
            
            if(entorno.existeEnActual(val)){
                var simAux2 = entorno.getSimbolo(val)
                return simAux2.getValorImplicito(entorno, ast)
            }else{
                if(entorno.existe(val)){
                    var simAux2 = entorno.getSimbolo(val)
                  return simAux2.getValorImplicito(entorno, ast)
                }
                
            }
            
        }
        return val
    }

    Aritmetica.prototype.getValorImplicito = function(entorno, ast){
        
        var valor1 =this.getValor(entorno, ast, this.expr1)
        var valor2 = this.getValor(entorno, ast, this.expr2)
       
        if (typeof valor1 == 'number' && typeof valor2 == 'number'){
            switch (this.operador) {
                case operador.suma:
                    return this.valor = valor1 + valor2;
                case operador.multiplicacion:
                    return this.valor = valor1 * valor2;
                case operador.resta:
                    return this.valor = valor1 - valor2 ;
                case operador.division:
                    return this.valor = valor1 / valor2;
                case operador.suma:
                    return this.valor = valor1 + valor2;
                case operador.modulo :
                    return this.valor = valor1 % valor2;
                case operador.potencia:
                    return this.valor = Math.pow(valor1, valor2)

                default:
                    break;
            }
   
            
        }

    }
    return Aritmetica;
}())