var logica = /** @class */ (function () {
    function logica(expr1, operador, expr2, linea, column, tipo, entorno) {
        this.expr1 = expr1;
        this.operador = operador;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };
    logica.prototype.getValor = function(entorno, ast, expr){
        var val =expr.getValorImplicito()
        if(typeof val == "object"  ){
            
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
    logica.prototype.getValorImplicito = function(entorno, ast){
        var valor1 =-1
        var valor2 =-1
        if(this.expr1.length>0){
            this.expr1.forEach(e => {
                valor1 = e.getValorImplicito(entorno,ast)
           });
        }else{
            valor1 = this.expr1.getValorImplicito(entorno,ast)
        }
        
        if(this.expr2.length>0){
            this.expr2.forEach(e => {
                valor2 = e.getValorImplicito(entorno,ast)
            });
        }else{
            valor2 = this.expr2.getValorImplicito(entorno, ast)
        }
        
        

        if(typeof valor1 =='boolean' && typeof valor2 == 'boolean'){
            
            switch (this.operador) {
                case logica.and:
                    return  (valor1 && valor2)? this.valor = true :  this.valor =false
                case logica.or:
                    return  (valor1 || valor2)? this.valor = true :  this.valor =false
                case logica.or:
                    return  (!valor1)? this.valor = true :  this.valor =false
                default:
                    break;
            }
        }
    }
    return logica;
}());