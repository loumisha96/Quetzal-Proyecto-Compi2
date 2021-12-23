var Primitivo;

(function (Primitivo) {
    Primitivo[Primitivo["int"] = 0] = "int";
    Primitivo[Primitivo["double"] = 1] = "double";
    Primitivo[Primitivo["boolean"] = 2] = "boolean";
    Primitivo[Primitivo["char"] = 3] = "char";
    Primitivo[Primitivo["String"] = 4] = "String";
    
})(Primitivo || (Primitivo = {}));

var tipoInstr;
(function (tipoInstr) {
    tipoInstr[tipoInstr["If"] = 0] = "If";
    tipoInstr[tipoInstr["For"] = 1] = "For";
    tipoInstr[tipoInstr["Print"] = 2] = "Print";
    tipoInstr[tipoInstr["While"] = 3] = "While";
    tipoInstr[tipoInstr["Switch"] = 4] = "Switch";
    tipoInstr[tipoInstr["DoWhile"] = 5] = "DoWhile";
    tipoInstr[tipoInstr["Foreach"] = 6] = "Foreach";
    tipoInstr[tipoInstr["Break"] = 7] = "Break";
    tipoInstr[tipoInstr["Return"] = 8] = "Return";
    tipoInstr[tipoInstr["Funcion"] = 9] = "Funcion";
    tipoInstr[tipoInstr["DeclaracionExpr"]=10]="DeclaracionExpr";
    tipoInstr[tipoInstr["AsignacionExpr"]=11]="AsignacionExpr";
    tipoInstr[tipoInstr["Call"]=12]="Call";
    tipoInstr[tipoInstr["Struct"]=13]="Struct";
    tipoInstr[tipoInstr["Main"]=14]="Main";
    tipoInstr[tipoInstr["DeclaracionArray"]=15]="DeclaracionArray";
    tipoInstr[tipoInstr["DeclaracionCall"]=16]="DeclaracionCall";
    tipoInstr[tipoInstr["DeclaracionStruct"]=17]="DeclaracionStruct";
    tipoInstr[tipoInstr["DeclaracionVarios"]=18]="DeclaracionVarios";
    tipoInstr[tipoInstr["DeclaracionStruct2"]=19]="DeclaracionStruct2";
    tipoInstr[tipoInstr["AsignacionAttrb"]=20]="AsignacionAttrb";
    tipoInstr[tipoInstr["AsignacionCopiaArr"]=21]="AsignacionCopiaArr";
    tipoInstr[tipoInstr["Parametro"]=22]="Parametro";
    tipoInstr[tipoInstr["Atributo"]=23]="Atributo";
    tipoInstr[tipoInstr["ReturnE"] = 24] = "ReturnE";
    tipoInstr[tipoInstr["Ternario"] = 25] = "Ternario";
    tipoInstr[tipoInstr["Elseif"] = 26] = "Elseif";
    tipoInstr[tipoInstr["Else"] = 27] = "Else";
    tipoInstr[tipoInstr["Nativa"] = 28] = "Nativa";
   // tipoInstr[tipoInstr["ReturnE"] = 8] = "ReturnE";
})(tipoInstr || (tipoInstr = {}));

var Valor;

(function (Valor) {
    Valor[Valor["cadena"] = 0] = "cadena";
    Valor[Valor["digito"] = 1] = "digito";
    Valor[Valor["decimal"] = 2] = "decimal";
    Valor[Valor["id"] = 3] = "id";
    Valor[Valor["null"] = 4] = "null";
    Valor[Valor["negativo"] = 5] = "negativo";
})(Valor || (Valor = {}));

var tipoF;

(function (tipoF) {
    tipoF[tipoF["String"] = 0] = "String";
    tipoF[tipoF["int"] = 1] = "int";
    tipoF[tipoF["boolean"] = 2] = "boolean";
    tipoF[tipoF["char"] = 3] = "char";
    tipoF[tipoF["void"] = 4] = "void";
    
    
})(tipoF || (tipoF = {}));

var trigo;

(function (trigo) {
    trigo[trigo["sin"] = 0] = "sin";
    trigo[trigo["cos"] = 1] = "cos";
    trigo[trigo["tan"] = 2] = "tan";
    
})(trigo || (trigo = {}));

var logica;

(function (logica) {
    logica[logica["and"] = 0] = "and";
    logica[logica["or"] = 1] = "or";
    logica[logica["not"] = 2] = "not";
    
})(logica || (logica = {}));

var operador;

(function (operador) {
    operador[operador["suma"] = 0] = "suma";
    operador[operador["resta"] = 1] = "resta";
    operador[operador["multiplicacion"] = 2] = "multiplicacion";
    operador[operador["division"] = 3] = "division";
    operador[operador["potencia"] = 4] = "potencia";
    operador[operador["modulo"] = 5] = "modulo";
    operador[operador["menor"] = 6] = "menor";
    operador[operador["mayor"] = 7] = "mayor";
    operador[operador["menorQue"] = 8] = "menorQue";
    operador[operador["mayorQue"] = 9] = "mayorQue";
    operador[operador["menorIgual"] = 10] = "menorIgual";
    operador[operador["mayorIgual"] = 11] = "mayorIgual";
    operador[operador["diferente"] = 12] = "diferente";
    operador[operador["not"] = 13] = "not";
    operador[operador["equalEqual"] = 14] = "equalEqual";
    operador[operador["increment"] = 15] = "increment";
    operador[operador["decrement"] = 16] = "decrement";
    operador[operador["sqrt"] = 17] = "sqrt";
    operador[operador["pot"] = 18] = "pot";
   
    
})(operador || (operador = {}));

var Nativa;

(function (Nativa) {
    Nativa[Nativa["caracterOfPosition"] = 0] = "caracterOfPosition";
    Nativa[Nativa["subString"] = 1] = "subString";
    Nativa[Nativa["length"] = 2] = "length";
    Nativa[Nativa["toUppercase"] = 3] = "toUppercase";
    Nativa[Nativa["toLowercase"] = 4] = "toLowercase";
    Nativa[Nativa["pop"] = 5] = "pop";
    Nativa[Nativa["push"] = 6] = "push";
    Nativa[Nativa["intParse"] = 7] = "intParse";
    Nativa[Nativa["doubleParse"] = 8] = "doubleParse";
    Nativa[Nativa["booleanParse"] = 9] = "booleanParse";
    Nativa[Nativa["toInt"] = 10] = "toInt";
    Nativa[Nativa["toDouble"] = 11] = "toDouble";
    Nativa[Nativa["string"] = 12] = "string";
    Nativa[Nativa["typeof"] = 13] = "typeof";
    
    
})(Nativa || (Nativa = {}));