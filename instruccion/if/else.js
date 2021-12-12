var else_ = /** @class */ (function () {
    function else_(instrucciones,linea, column, tipo) {
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    else_.prototype.ejecutar = function (entorno, ast) {
        this.instrucciones.forEach(instr => {
            instr.ejecutar(entorno, ast)
        });
    }
    return else_;
}());