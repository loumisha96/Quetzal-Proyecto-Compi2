
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
            if(expr.length>0){
                expr.forEach(e => {
                    val = e.getValorImplicito(entorno, ast)
                });
            }else
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
        if(this.operador !=operador.sqrt)
            var valor2 = this.getValor(entorno, ast, this.expr2)
        else
            valor2=-1
       
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
                case operador.sqrt:
                    return this.valor = Math.sqrt(valor1)
                

            }
   
            
        }else if(typeof valor1 == 'string' && typeof valor2 == 'number'){
            if(operador.pot== this.operador){

                var aux = valor1.replaceAll("\"",'')
                valor1=""
                for(var i=0; i<valor2; i++){
                    valor1 += aux
                }
                return this.valor = "\""+valor1+"\""
            }
        }else{
            Errores.push(new nodoError("Error Semántico","Tipos no permitidos", "",this.linea, this.column))
        }

    }
    Aritmetica.prototype.get3D=function(){
        var codigo3D =""
        switch (this.operador) {
            case operador.suma:
                codigo3D+=this.expr1.get3D()+"+"+this.expr2.get3D()
                break;
        
            default:
                break;
        }
        return codigo3D
    }
    return Aritmetica;
}())