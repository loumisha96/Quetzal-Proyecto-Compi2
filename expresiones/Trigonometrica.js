var Trigonometrica = /** @class */ (function () {
    function Trigonometrica(tipoTr, expr, linea, column) {
      
        this.tipoTr = tipoTr;
        this.expr = expr;
        this.linea =  linea;
        this.column = column;
      //  this.tipo = tipo;
        //this.entorno = entorno;
    };
    Trigonometrica.prototype.getValorImplicito=function(entorno,ast){
      
        var val =-1
        if(this.expr.tipo == tipoInstr.Call){
          val = this.expr.ejecutar(entorno,ast)
        }else{
            val = this.expr.getValorImplicito(entorno, ast)
        }
        if(typeof val=='number'){
            switch (this.tipoTr) {
              case trigo.sin :
                return Math.sin(val)
              case trigo.cos :
                return Math.cos(val)
              case trigo.tan:
                return Math.tan(val)
            }
        }else{
          Errores.push(new nodoError("Tipo Semántico", "Tipado no permitido", "", this.linea, this.column))
        }
      }
    return Trigonometrica;
}());