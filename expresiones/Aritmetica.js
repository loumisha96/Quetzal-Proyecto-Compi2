
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
        var val =-1
        if(expr.tipo == tipoInstr.Call){
            val = expr.ejecutar(entorno,ast)
        }else{
            val = expr.getValorImplicito(entorno, ast)
        }

        if(typeof val == "object"  ){
            
            if(entorno.existe(val)){
                var simAux2 = entorno.getSimbolo(val)
                return simAux2.getValorImplicito(entorno, ast)
            }
        }
        return val
    }

    Aritmetica.prototype.getValorImplicito = function(entorno, ast){
        
        var valor1 =this.getValor(entorno, ast, this.expr1)
        var valor2 = this.getValor(entorno, ast, this.expr2)
       
        if (typeof valor1 == 'number' && typeof valor2 == 'number'){
            
            if(isNaN(valor1) || isNaN(valor2)){
            //    console.log(entorno)
            }
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

            }
   
            
        }else{
            Errores.push(new nodoError("Error Semántico","Tipos no permitidos", "",this.linea, this.column))
        }

    }
    return Aritmetica;
}())