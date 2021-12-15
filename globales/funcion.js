var Funcion = /** @class */ (function () {
    function Funcion(tipoFuncion, id, parametros, instrucciones,linea, column, tipo) {
        this.tipoFuncion = tipoFuncion;
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
    };
    Funcion.prototype.getID=function(){
        return this.id
    }
    Funcion.prototype.ejecutar=function(entorno,ast){
        this.parametros.forEach(param => {
            param.ejecutar(entorno,ast)
        });
    }
    return Funcion;
}());