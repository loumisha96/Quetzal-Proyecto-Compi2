var dowhile = /** @class */ (function () {
    function dowhile(instrucciones, condiciones, linea, column, tipo) {
        this.instrucciones = instrucciones;
        this.condiciones = condiciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
      //  this.entorno = entorno;
    };

    dowhile.prototype.ejecutar = function(entorno, ast){

      const nuevoEnt = new Entorno(entorno)
      this.instrucciones.forEach(instruccion => {
          instruccion.ejecutar(nuevoEnt, ast)

      });

      this.condiciones.forEach(cond => {
          var valor = cond.getValorImplicito(entorno,ast)
          if (typeof valor == 'boolean'){
              if(valor){
                  this.ejecutar(entorno, ast)
              }else{
                   return
              }
          }
      });
  }
    return dowhile;
}());