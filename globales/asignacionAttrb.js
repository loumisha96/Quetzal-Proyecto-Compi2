var asignacionAttrb = /** @class */ (function () {
    function asignacionAttrb(id, id1, expr, linea, column, tipo) {
        this.id = id;
        this.id1 = id1;
        this.expr = expr;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
    };
    asignacionAttrb.prototype.ejecutar = function(entorno, ast){
        if(entorno.existe(this.id)){
            var sim = entorno.getSimbolo(this.id)
            var st = ast.getStruct(this.id)
            if(st.existeAttrb(this.id1)){

            }
        }
    }
    return asignacionAttrb;
}());