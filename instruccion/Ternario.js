var Ternario = /** @class */ (function () {
    function Ternario(condiciones, expr1, expr2, linea, column, tipo){
        
        this.condiciones = condiciones;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
    }
    Ternario.prototype.ejecutar = function(entorno, ast){
        this.condiciones.forEach(cond => {
            var valor = cond.getValorImplicito(entorno,ast)
            if (typeof valor == 'boolean'){
                if(valor){
                    this.expr1.ejecutar(entorno,ast)
                }else{
                    this.expr2.ejecutar(entorno,ast)
                }
            }else{
                Errores.push(new nodoError("Tipo Semántico", "En declaracion id: " +this.id, this.linea, this.column))
            }
        });
    }
    return Ternario;
}());