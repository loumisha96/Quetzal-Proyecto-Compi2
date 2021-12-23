var produccion= /**@class */(function(){
    function produccion(){
        this.produccion =[]
    }
    produccion.prototype.getGramatica = function (tipo, num){
        switch (tipo) {
            case "S":
                switch (num) {
                    case 1:
                        this.produccion.push("S->MAIN")
                        break;
                    case 2:
                        this.produccion.push("S->MAIN GLOBALES")
                        break;
                    case 3:
                        this.produccion.push("S->GLOBALES MAIN")
                        break
                    case 4:
                        this.produccion.push("S->GLOBALES MAIN GLOBALES")
                        break
                
                }
                break;
            case "GLOBALES":
                switch (num) {
                    case 1:
                        this.produccion.push("GLOBALES -> GLOBALES GLOBAL")
                        break;
                    case 2:
                        this.produccion.push("GLOBALES-> GLOBAL")
                        break;
                }
                break;
            case "GLOBAL":
                switch (num) {
                    case 1:
                        this.produccion.push("GLOBAL->FUNCION")
                        break;
                    case 2:
                        this.produccion.push("GLOBAL->DECLARACION")
                        break;
                    case 3:
                        this.produccion.push("GLOBAL->ASIGNACION")
                        break
                    case 4:
                        this.produccion.push("GLOBAL->STRUCT")
                        break
                
                }
                break;
            case "DECLARACION":
                switch (num) {
                    case 1:
                        this.produccion.push("DECLARACION-> TIPO corcheteIzq corcheteDer id equal corcheteIzq VARIABLES corcheteDer")
                        break;
                    case 2:
                        this.produccion.push("DECLARACION-> id id equal id parIzq VARIABLES parDer")
                        break;
                    case 3:
                        this.produccion.push("DECLARACION-> TIPO DEC CALL")
                        break
                    case 4:
                        this.produccion.push("DECLARACION-> TIPO DEC E")
                        break
                    case 5:
                        this.produccion.push("DECLARACION-> TIPO IDS")
                        break
                    case 6:
                        this.produccion.push("DECLARACION-> id id")
                        break
                
                }
                break;
            case "DEC":
                this.produccion.push("DEC-> id equal")
                break;
            case "TIPO":
                switch (num) {
                    case 1:
                        this.produccion.push("TIPO-> int")
                        break;
                    case 2:
                        this.produccion.push("TIPO-> double")
                        break;
                    case 3:
                        this.produccion.push("TIPO-> boolean")
                        break
                    case 4:
                        this.produccion.push("TIPO-> char")
                        break
                    case 5:
                        this.produccion.push("TIPO-> String")
                        break
                    case 6: 
                         this.produccion.push("TIPO-> void")
                        break
                
                }
                break;
            case "ASIGNACION":
                switch (num) {
                    case 1:
                        this.produccion.push("ASIGNACION-> id equal E")
                        break;
                    case 2:
                        this.produccion.push("ASIGNACION-> id point id equal E")
                        break;
                    case 3:
                        this.produccion.push("ASIGNACION-> id equal numeral id")
                        break
                    
                
                }
                break;

            case "EXPRESIONES":
                switch (num) {
                    case 1:
                        this.produccion.push("EXPRESIONES->EXPRESIONES comma E")
                        break;
                    case 2:
                        this.produccion.push("EXPRESIONES->E")
                        break;
                }
                break;
            case "VARIABLES":
                switch (num) {
                    case 1:
                        this.produccion.push("VARIABLES-> VARIABLES comma E")
                        break;
                    case 2:
                        this.produccion.push("VARIABLES-> E")
                        break;
                }
                break;
            case "VALOR":
                switch (num) {
                    case 1:
                        this.produccion.push("VALOR->cadena")
                        break;
                    case 2:
                        this.produccion.push("VALOR->digits")
                        break;
                    case 3:
                        this.produccion.push("VALOR->decimal")
                        break
                    case 4:
                        this.produccion.push("VALOR->null")
                        break
                
                }
                break;
            case "IDS":
                switch (num) {
                    case 1:
                        this.produccion.push("IDS->IDS comma id")
                        break;
                    case 2:
                        this.produccion.push("id")
                        break;
                }
                break;
            case "FUNCION":
                switch (num) {
                    case 1:
                        this.produccion.push("FUNCION-> TIPO PARAMETROS parDer llaIzq INSTRUCCIONES llaDer ")
                        break;
                    case 2:
                        this.produccion.push("FUNCION->TIPO FUNC parDer llaIzq INSTRUCCIONES llaDer")
                        break;
                    case 3:
                        this.produccion.push("FUNCION->TIPO FUNC PARAMETROS parDer llaIzq llaDer")
                        break
                    case 4:
                        this.produccion.push("FUNCION->TIPO FUNC parDer llaIzq llaDer")
                        break
                
                }
                break;
            case "FUNC":
                this.produccion.push("FUNC->id parIzq")
                break;
            case "PARAMETROS":
                switch (num) {
                    case 1:
                        this.produccion.push("PARAMETROS->PARAMETROS comma PARAMETRO")
                        break;
                    case 2:
                        this.produccion.push("PARAMETROS->PARAMETRO")
                        break;
                }
                break;
            case "PARAMETRO":
                switch (num) {
                    case 1:
                        this.produccion.push("PARAMETRO-> TIPO id")
                        break;
                    case 2:
                        this.produccion.push("PARAMETRO-> TIPO corcheteIzq corcheteDer id ")
                        break;
                }
                break;
            case "STRUCT":
                this.produccion.push("STRUCT->struct id llaIzq ATRIBUTOS llaDer")
                break;
            case "ATRIBUTOS":
                switch (num) {
                    case 1:
                        this.produccion.push("ATRIBUTOS-> ATRIBUTOS comma ATRIBUTO")
                        break;
                    case 2:
                        this.produccion.push("ATRIBUTOS-> ATRIBUTO")
                        break;
                }
                break;
            case "ATRIBUTO":
                switch (num) {
                    case 1:
                        this.produccion.push("ATRIBUTO->TIPO id")
                        break;
                    case 2:
                        this.produccion.push("ATRIBUTO-> id id")
                        break;
                    case 3:
                        this.produccion.push("ATRIBUTO->TIPO corcheteIzq corcheteDer id")
                        break
                
                }
                break;
            case "MAIN":
                switch (num) {
                    case 1:
                        this.produccion.push("MAIN->TIPO main parIzq parDer llaIzq INSTRUCCIONES llaDer")
                        break;
                    case 2:
                        this.produccion.push("MAIN->TIPO main parIzq parDer llaIzq llaDer")
                        break;
                }
                break;
            case "INSTRUCCIONES":
                switch (num) {
                    case 1:
                        this.produccion.push("INSTRUCCIONES->INSTRUCCIONES INSTRUCCION")
                        break;
                    case 2:
                        this.produccion.push("INSTRUCCIONES-> INSTRUCCION")
                        break;
                }
                break;
            case "INSTRUCCION":
                switch (num) {
                    case 1:
                        this.produccion.push("INSTRUCCION->GLOBAL")
                        break;
                    case 2:
                        this.produccion.push("INSTRUCCION->CALL")
                        break;
                    case 3:
                        this.produccion.push("INSTRUCCION->IF")
                        break
                    case 4:
                        this.produccion.push("INSTRUCCION->FOR")
                        break
                    case 5:
                        this.produccion.push("INSTRUCCION->PRINT")
                        break
                    case 6:
                        this.produccion.push("INSTRUCCION->WHILE")
                        break
                    case 7:
                        this.produccion.push("INSTRUCCION->SWITCH")
                        break
                    case 8:
                        this.produccion.push("INSTRUCCION->DOWHILE")
                        break
                    case 9:
                        this.produccion.push("INSTRUCCION->FOREACH")
                        break
                    case 10:
                        this.produccion.push("INSTRUCCION->TERNARIO")
                        break
                    case 11:
                        this.produccion.push("INSTRUCCION->break")
                        break
                    case 12:
                        this.produccion.push("INSTRUCCION->return E")
                        break
                    case 13:
                        this.produccion.push("INSTRUCCION->return CALL")
                        break
                    case 14:
                        this.produccion.push("INSTRUCCION->return")
                        break
                    case 15:
                        this.produccion.push("INSTRUCCION->E")
                        break
                
                }
                break;
            case "CALL":
                switch (num) {
                    case 1:
                        this.produccion.push("CALL->id parIzq parDer")
                        break;
                    case 2:
                        this.produccion.push("CALL->id parIzq VARIABLES parDer")
                        break;
                }
                break;
            case "TERNARIO":
                this.produccion.push("TERNARIO->parIzq CONDICIONES parDer interrogacion INSTRUCCION colon INSTRUCCION")
                break;
            case "IF":
                switch (num) {
                    case 1:
                        this.produccion.push("IF->if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer ELSES")
                        break;
                    case 2:
                        this.produccion.push("IF->if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer")
                        break;
                    case 3:
                        this.produccion.push("IF->if parIzq CONDICIONES parDer llaIzq llaDer ELSES")
                        break
                    case 4:
                        this.produccion.push("IF->if parIzq CONDICIONES parDer llaIzq llaDer ")
                        break
                    case 5:
                        this.produccion.push("IF->if parIzq CONDICIONES parDer INSTRUCCION ELSES  ")
                        break
                
                }
                break;
            case "ELSES":
                switch (num) {
                    case 1:
                        this.produccion.push("ELSES->ELSES ELSE")
                        break;
                    case 2:
                        this.produccion.push("ELSES->ELSE")
                        break;
                }
                break;
            case "ELSE":
                switch (num) {
                    case 1:
                        this.produccion.push("ELSE->else if parIzq CONDICIONES parDer llaIzq llaDer")
                        break;
                    case 2:
                        this.produccion.push("ELSE->else if parIzq CONDICIONES parDer llaIzq  INSTRUCCIONES llaDer")
                        break;
                    case 3:
                        this.produccion.push("ELSE->else if parIzq CONDICIONES parDer INSTRUCCION")
                        break
                    case 4:
                        this.produccion.push("ELSE->else llaIzq INSTRUCCIONES llaDer")
                        break
                    case 5:
                        this.produccion.push("ELSE->else INSTRUCCION")
                        break
                    case 6:
                        this.produccion.push("ELSE->else llaIzq llaDer")
                        break
                
                }
                break;
            case  "SWITCH":
                this.produccion.push("SWITCH->switch parIzq id parDer llaIzq CASES llaDer")
                break;
            case "CASES":
                switch (num) {
                    case 1:
                        this.produccion.push("CASES->CASES CASE ")
                        break;
                    case 2:
                        this.produccion.push("CASES->CASE")
                        break;
                }
                break;
            case "CASE":
                switch (num) {
                    case 1:
                        this.produccion.push("CASE->case VALOR colon  INSTRUCCIONES break ptcoma")
                        break;
                    case 2:
                        this.produccion.push("CASE->case VALOR colon  INSTRUCCIONES ")
                        break;
                    case 3:
                        this.produccion.push("CASE->case VALOR colon break ptcoma")
                        break
                    case 4:
                        this.produccion.push("CASE->default colon INSTRUCCIONES break ptcoma")
                        break
                
                }
                break;
            case "WHILE":
                switch (num) {
                    case 1:
                        this.produccion.push("WHILE->while parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer ")
                        break;
                    case 2:
                        this.produccion.push("WHILE->while parIzq CONDICIONES parDer llaIzq llaDer ")
                        break;
                }
                break
            case "DOWHILE":
                switch (num) {
                    case 1:
                        this.produccion.push("DOWHILE->do llaIzq INSTRUCCIONES llaDer while parIzq CONDICIONES parDer")
                        break;
                    case 2:
                        this.produccion.push("DOWHILE->do llaIzq llaDer while parIzq CONDICIONES parDer")
                        break;
                
                }
                break
            case "FOR":
                switch (num) {
                    case 1:
                        this.produccion.push("FOR->for parIzq FORVAR ptcoma FORVAR1 ptcoma FORVAR2 parDer llaIzq INSTRUCCIONES llaDer")
                        break;
                    case 2:
                        this.produccion.push("FOR->for parIzq FORVAR ptcoma FORVAR1 ptcoma FORVAR2 parDer llaIzq llaDer")
                        break;
                }
                break;
            case "FORVAR":
                switch (num) {
                    case 1:
                        this.produccion.push("FORVAR->id equal E")
                        break;
                    case 2:
                        this.produccion.push("FORVAR->TIPO id equal E ")
                        break;
                 
                }
                break;
            case "FORVAR1":
                switch (num) {
                    case 1:
                        this.produccion.push("FORVAR1->E menor E")
                        break;
                    case 2:
                        this.produccion.push("FORVAR1->E mayor E")
                        break;
                    case 3:
                        this.produccion.push("FORVAR1->E menorIgual E")
                        break
                    case 4:
                        this.produccion.push("FORVAR1->E mayorIgual E")
                        break
                    case 5:
                        this.produccion.push("FORVAR1->E equal E")
                        break
                
                }
                break;
            case "FORVAR2":
                switch (num) {
                    case 1:
                        this.produccion.push("FORVAR2->id increment")
                        break;
                    case 2:
                        this.produccion.push("FORVAR2->id decrement")
                        break;
                
                }
                break;
            case "FOREACH":
                switch (num) {
                    case 1:
                        this.produccion.push("FOREACH->for id in FOREACH1 llaIzq INSTRUCCIONES llaDer")
                        break;
                    case 2:
                        this.produccion.push("FOREACH->for id in FOREACH1 llaIzq llaDer")
                        break;
                 
                }
                break
            case "FOREACH1":
                switch (num) {
                    case 1:
                        this.produccion.push("FOREACH1->cadena")
                        break;
                    case 2:
                        this.produccion.push("FOREACH1->id")
                        break;
                    case 3:
                        this.produccion.push("FOREACH1->corcheteIzq VARIABLES corcheteDer")
                        break
                    case 4:
                        this.produccion.push("FOREACH1->id corcheteIzq digits colon digits corcheteDer")
                        break
                    case 5:
                        this.produccion.push("FOREACH1->id corcheteIzq begin colon end corcheteDer")
                        break
                
                }
                break;
            case "E":
                switch (num) {
                    case 1:
                        this.produccion.push("E->E minus E")
                        break;
                    case 2:
                        this.produccion.push("E->E asterisk E")
                        break;
                    case 3:
                        this.produccion.push("E->E add E")
                        break
                    case 4:
                        this.produccion.push("E->E pot E")
                        break
                    case 5:
                        this.produccion.push("E->E div E")
                        break
                    case 6:
                        this.produccion.push("E->E mod E")
                        break
                    case 7:
                        this.produccion.push("E->parIzq E parDer")
                        break
                    case 8:
                        this.produccion.push("E->ARRAY")
                        break
                    case 9:
                        this.produccion.push("E->pow parIzq E comma E parDer")
                        break
                    case 10:
                        this.produccion.push("E->TRIGONOMETRICA parIzq E parDer")
                        break
                    case 11:
                        this.produccion.push("E->VALOR")
                        break
                    case 12:
                        this.produccion.push("E->numeral id")
                        break
                    case 13:
                        this.produccion.push("E->NATIVA")
                        break
                    case 14:
                        this.produccion.push("E->id point id")
                        break
                    case 15:
                        this.produccion.push("E->OperarARRAY")
                        break
                    case 16:
                        this.produccion.push("E->id increment ")
                        break
                    case 17:
                        this.produccion.push("E->id decrement")
                        break
                    case 18:
                        this.produccion.push("E->E minus E")
                        break
                    case 19:
                        this.produccion.push("E->E concat E")
                        break
                    case 20:
                        this.produccion.push("E->minus E")
                        break
                    case 21:
                        this.produccion.push("E->E")
                        break
                    case 22:
                        this.produccion.push("E->CALL")
                        break
                    case 23:
                        this.produccion.push("E->sqrt parIzq E parDer")
                        break
                    case 24:
                        this.produccion.push("E->E COND E")
                        break
                   

                }
                break;
            case "NATIVA":
                switch (num) {
                    case 1:
                        this.produccion.push("NATIVA->E point caracterOfPosition parIzq E parDer")
                        break;
                    case 2:
                        this.produccion.push("NATIVA->E point subString parIzq E comma E parDer")
                        break;
                    case 3:
                        this.produccion.push("NATIVA->E point length parIzq parDer")
                        break
                    case 4:
                        this.produccion.push("NATIVA->E point toUppercase parIzq parDer")
                        break
                    case 5:
                        this.produccion.push("NATIVA->E point toLowercase parIzq parDer")
                        break
                    case 6:
                        this.produccion.push("NATIVA->E point pop parIzq  parDer")
                        break
                    case 7:
                        this.produccion.push("NATIVA->E point push parIzq E parDer")
                        break
                    case 8:
                        this.produccion.push("NATIVA->int point parse parIzq E parDer")
                        break
                    case 9:
                        this.produccion.push("NATIVA->double  point parse parIzq E parDer")
                        break
                    case 10:
                        this.produccion.push("NATIVA->boolean point parse parIzq E parDer")
                        break
                    case 11:
                        this.produccion.push("NATIVA->toInt parIzq E parDer")
                        break
                    case 12:
                        this.produccion.push("NATIVA->toDouble parIzq E parDer")
                        break
                    case 13:
                        this.produccion.push("NATIVA->string parIzq E parDer")
                        break
                    case 14:
                        this.produccion.push("NATIVA->typeof parIzq E parDer")
                        break
                }
                break;
            case "OPERARARRAY":
                switch (num) {
                    case 1:
                        this.produccion.push("OPERARARRAY->TRIGONOMETRICA numeral ARITMETICA parIzq ARRAY parDer")
                        break;
                    case 2:
                        this.produccion.push("OPERARARRAY->id numeral ARITMETICA E ")
                        break;
                    
                }
                break
            case "TRIGONOMETRICA":
                switch (num) {
                    case 1:
                        this.produccion.push("TRIGONOMETRICA->sin")
                        break;
                    case 2:
                        this.produccion.push("TRIGONOMETRICA->cos")
                        break;
                    case 3:
                        this.produccion.push("TRIGONOMETRICA->tan")
                        break
                }
                break
            case "ARRAY":
                switch (num) {
                    case 1:
                        this.produccion.push("ARRAY->corcheteIzq EXPRESIONES  corcheteDer")
                        break;
                    case 2:
                        this.produccion.push("ARRAY->corcheteIzq corcheteDer")
                        break;
                    case 3:
                        this.produccion.push("ARRAY->id")
                        break
                }
                break
            case "CONDICIONES":
                switch (num) {
                    case 1:
                        this.produccion.push("CONDICIONES->CONDICIONES LOGICA COND ")
                        break;
                    case 2:
                        this.produccion.push("CONDICIONES->COND")
                        break;
                    
                }
                break;
            case "COND":
                switch (num) {
                    case 1:
                        this.produccion.push("COND->CONDICION")
                        break;
                    case 2:
                        this.produccion.push("COND->parIzq CONDICION parDer")
                        break;
                    
                }
                break;
            case "CONDICION":
                switch (num) {
                    case 1:
                        this.produccion.push("CONDICION->E equalEqual E")
                        break;
                    case 2:
                        this.produccion.push("CONDICION->E diferent E	")
                        break;
                    case 3:
                        this.produccion.push("CONDICION->E menor E 	")
                        break
                    case 4:
                        this.produccion.push("CONDICION->E mayor E")
                        break;
                    case 5:
                        this.produccion.push("CONDICION->E mayorIgual E")
                        break;
                    case 6:
                        this.produccion.push("CONDICION->E menorIgual E")
                        break;
                    case 7:
                        this.produccion.push("CONDICION->not E2")
                        break
                }
                break;
            case "LOGICA":
                switch (num) {
                    case 1:
                        this.produccion.push("LOGICA->and")
                        break;
                    case 2:
                        this.produccion.push("LOGICA->or")
                        break;
                    case 3:
                        this.produccion.push("LOGICA->not")
                        break
                }
                break;
            case "PRINT":
                switch (num) {
                    case 1:
                        this.produccion.push("PRINT->print parIzq EXPRESIONES parDer")
                        break;
                    case 2:
                        this.produccion.push("PRINT->print parIzq CALL parDer	")
                        break;
                    case 3:
                        this.produccion.push("PRINT->print parIzq E comma E parDer")
                        break
                    case 4:
                        this.produccion.push("PRINT->println parIzq E parDer")
                        break
                    case 5:
                        this.produccion.push("PRINT->println parIzq E comma E parDer")
                        break
                }
                break;
            
        }
    }
    return produccion
}())