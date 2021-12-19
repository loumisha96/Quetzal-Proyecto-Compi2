var main = /** @class */ (function () {
    function main(tipoMain, instrucciones, linea, column, tipo) {
        
        this.tipoMain = tipoMain;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
       // this.entorno = entorno;
    };

    main.prototype.ejecutar = function (ent, ast){
        const nuevoEnt = new Entorno(ent,"MAIN") 
        
        this.instrucciones.forEach(instruccion => {
                instruccion.ejecutar(ent, ast)
        });
        
        
    }

    main.prototype.get3D = function(){
        var codigo3D = 
        `
        #include <stdio.h>\n 
        double heap[30101999];
        double stack[30101999];
        double P;
        double H;`
        +tipoF[this.tipoMain] +" main(){\n";
        this.instrucciones.forEach(instruccion => {
            codigo3D += instruccion.get3D()
        });

        codigo3D +="}"

        return codigo3D
    }

    return main;
}());