/*definición léxica*/


%lex
%options case-insensitive
%s                                  comment
%%
"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
"*"         return 'asterisk';
"."         return 'point';
"("         return 'parIzq';
")"         return 'parDer';
"{"         return 'llaIzq';
"}"         return 'llaDer';
":"         return 'colon';
"!="        return 'diferent';
"!"			return 'not';
"#"			return 'numeral';
"?"			return 'interrogacion';
"||"        return 'or';
"["         return 'corcheteIzq';
"]"         return 'corcheteDer';
";"         return 'ptcoma';
"++"		return 'increment';
"+"         return 'add';
","         return 'comma';
"--"		return 'decrement';
"-"         return 'minus';
"=="		return 'equalEqual';
"="         return 'equal';
"<="        return 'menorIgual';
"<"         return 'menor';
">="        return 'mayorIgual';
">"         return 'mayor';
"&&"        return 'and';
"&"			return 'concat';
"/"         return 'div';
"%"         return 'mod';
"main"		return 'main';
"begin"		return 'begin';
"end"       return 'end';
"in"		return 'in';
"pow"		return 'pow';
"sqrt"		return 'sqrt';
"sin"		return 'sin';
"cos"		return 'cos';
"tan"		return 'tan';
"pop"		return 'pop';
"push"		return 'push';
"void"		return 'void';
"int"		return 'int';
"double"    return 'double';
"boolean"	return 'boolean';
"char"		return 'char';
"String"	return 'String';
"struct"	return 'struct';
"break"		return 'break';
"return"	return 'return';
"if"		return 'if';
"null"		return 'null';
"else"		return 'else';
"switch"	return 'switch';
"case"		return 'case';
"while"		return 'while';
"do"		return 'do';
"for"		return 'for';
"^"			return 'pot';
"print"		return 'print';
"println"   return 'println';
"caracterOfPosition" return 'caracterOfPosition';
"continue"	return 'continue';
"subString" return 'subString';
"length"	return 'length';
"toUppercase" return 'toUppercase';
"toLowercase" return 'toLowercase';


/*Espacios en blanco*/
[ \r\t]+     {}       
\n           {}   
[0-9]+("."[0-9]+)?  return  'decimal'; 
[0-9]+                      return  'digits';

(\"({EscapeQuot}|[^"])*\")|("'""({EscapeApos}|[^'])*""'") return 'cadena';
[A-Za-z_][A-Za-z_0-9]*	    return 'id';


<<EOF>>                 return 'EOF';
.       {
        console.error('Error');
}
/lex


/* Asociación de operadores y precedencia */
%left 'add', 'minus' /*binary*/
%left  'div', 'asterisk'
%left 'pot', 'mod'



%left 'or'
%left 'and'
%left 'equalEqual', 'diferent'
%left 'mayor', 'menor', 'mayorIgual', 'menorIgual'



%left 'increment', 'decrement', 'menosU', 'not'
%left 'corcheteIzq'
%left 'parIzq', 'parDer', 'corcheteIzq', 'corcheteDer', 'llaIzq', 'llaDer'



<
%start ini 
%% /*definicion de gramática*/
ini	
	:S EOF { console.log($1); return $1;}
;

S
        :MAIN 																{$$= new nodo("S",[$1])}
		|MAIN GLOBALES 														{$$ = new nodo("S", [$1,$2]) }
		|GLOBALES MAIN 					  								    {$$ = new nodo("S", [$1,$2])}
		|GLOBALES MAIN GLOBALES 											{$$ = new nodo("S", [$1,$2,$3])}
		
;

GLOBALES
		:GLOBALES GLOBAL 													{$$ = new nodo("GLOBALES", [$1,$2])}
		|GLOBAL																{$$ = new nodo("GLOBALES", [$1])}
		
;
GLOBAL	
		:FUNCION																{$$ = new nodo("GLOBAL", [$1])}
		|DECLARACION 															{$$ = new nodo("GLOBAL", [$1])}
		|ASIGNACION																{$$ = new nodo("GLOBAL", [$1])}
		|STRUCT																	{$$ = new nodo("GLOBAL", [$1])}
		
;

DECLARACION
		:TIPO corcheteIzq corcheteDer id equal corcheteIzq VARIABLES corcheteDer{$$ = new nodo("DECLARACION", [$1,$2,$3,$4,$5,$6,$7,$8])}
		|id id equal id parIzq VARIABLES parDer									{$$ = new nodo("DECLARACION", [$1,$2,$3,$4,$5,$6,$7])}
		|TIPO id equal CALL														{$$ = new nodo("DECLARACION", [$1,$2,$3,$4])}
		|TIPO id equal E 														{$$ = new nodo("DECLARACION", [$1,$2,$3,$4])}
		|TIPO IDS 																{$$ = new nodo("DECLARACION", [$1,$2])}
		|id id 																	{$$ = new nodo("DECLARACION", [$1,$2])}
;

TIPO
		:int																	{$$ = new nodo("TIPO", [$1],$1)}
		|double																	{$$ = new nodo("TIPO", [$1]),$1}
		|boolean																{$$ = new nodo("TIPO", [$1]),$1}
		|char																	{$$ = new nodo("TIPO", [$1]),$1}
		|String																	{$$ = new nodo("TIPO", [$1]),$1}
;


ASIGNACION
		:id equal E 															{$$ = new nodo("ASIGNACION", [$1,$2,$3])}
		|id point id equal E 													{$$ = new nodo("ASIGNACION", [$1,$2,$3,$4,$5])}
		|id equal numeral id    												{$$ = new nodo("ASIGNACION", [$1,$2,$3,$4])}
;

EXPRESIONES
		: EXPRESIONES comma E 													{$$ = new nodo("EXPRESIONES", [$1,$2,$3])}
		|E 																		 {$$ = new nodo("EXPRESIONES", [$1])}
;



VARIABLES 
		:VARIABLES comma E														{$$ = new nodo("VARIABLES", [$1,$2,$3])}
		|E																		{$$ = new nodo("VARIABLES", [$1])}
;

VALOR 
		:cadena																	{$$ = new nodo("VALOR", [$1]),$1}
		|digits																	{$$ = new nodo("VALOR", [$1]),$1}
		|decimal																{$$ = new nodo("VALOR", [$1]),$1}
		|null																	{$$ = new nodo("VALOR", [$1]),$1}
;

IDS
		:IDS comma id															{$$ = new nodo("IDS", [$1,$2,$3])}
		|id 																	{$$ = new nodo("IDS", [$1],$1)}
;

FUNCION 
		:TIPOF parIzq PARAMETROS parDer llaIzq INSTRUCCIONES llaDer  		{$$ = new nodo("FUNCION", [$1[0],$1[1],$3,$3,$5,$6,$7])}
		|TIPOF parIzq parDer llaIzq INSTRUCCIONES llaDer             		{$$ = new nodo("FUNCION", [$1[0],$1[1],$3,$3,$5,$6])}
		|TIPOF parIzq PARAMETROS parDer llaIzq llaDer             			{$$ = new nodo("FUNCION", [$1[0],$1[1],$3,$3,$5,$6])}
		|TIPOF parIzq parDer llaIzq llaDer							    	{$$ = new nodo("FUNCION", [$1[0],$1[1],$3,$3,$5])}
;


TIPOF
	:int id																		{$$=[Primitivo.int, $2]}						
	|void id																	{$$=[tipoF.void, $2]}
	|id id																		{$$=[$1, $2]}
	|double id																	{$$=[Primitivo.double, $2]; }
	|String	id																	{$$=[Primitivo.string, $2]; }

;
PARAMETROS
		:PARAMETROS comma PARAMETRO    											{$$ = new nodo("PARAMETROS", [$1,$2,$3])}
		|PARAMETRO																{$$ = new nodo("PARAMETROS", [$1])}
;
PARAMETRO
		:TIPO id 																{$$ = new nodo("PARAMETRO", [$1,$2])}
		|TIPO corcheteIzq corcheteDer id 										{$$ = new nodo("PARAMETRO", [$1,$2,$3,$4])}
;

STRUCT		
		:struct id llaIzq ATRIBUTOS llaDer 										{$$ = new nodo("STRUCT", [$1,$2,$3,$4,$5])}
;

TIPO2
	:id																			{$$ = new nodo("TIPO2", [$1])}
	|TIPO																		{$$ = new nodo("TIPO2", [$1])}
	|void 																		{$$ = new nodo("TIPO2", [$1])}
;
TIPO3
	:id	main																		{$$ = new nodo("TIPO2", [$1,$2])}
	|TIPO main																	{$$ = new nodo("TIPO2", [$1,$2])}
	|void main																		{$$ = new nodo("TIPO2", [$1,$2])}
;

ATRIBUTOS
		:ATRIBUTOS comma ATRIBUTO 	 											{$$ = new nodo("ATRIBUTOS", [$1,$2,$3])}
		|ATRIBUTO																{$$ = new nodo("ATRIBUTOS", [$1])}
;

ATRIBUTO
		:TIPO id  					 											{$$ = new nodo("ATRIBUTO", [$1,$2])}
		|id id    									 							{$$ = new nodo("ATRIBUTO", [$1,$2])}
		|TIPO corcheteIzq corcheteDer id 										{$$ = new nodo("ATRIBUTO", [$1,$2,$3,$4])}
;

MAIN
		:TIPO3 main parIzq parDer llaIzq INSTRUCCIONES llaDer 					{$$ = new nodo("MAIN", [$1,$2,$3,$4,$5,$6,$7])}
		|TIPO3 main parIzq parDer llaIzq llaDer							 		{$$ = new nodo("MAIN", [$1,$2,$3,$4,$5,$6])}
		
;

INSTRUCCIONES
		:INSTRUCCIONES INSTRUCCION												{$$ = new nodo("INSTRUCCIONES", [$1,$2])}
		|INSTRUCCION															{$$ = new nodo("INSTRUCCIONES", [$1])}
;

INSTRUCCION
		:GLOBAL       															{$$ = new nodo("INSTRUCCION", [$1])}
		|CALL																	{$$ = new nodo("INSTRUCCION", [$1])}
		|IF 																	{$$ = new nodo("INSTRUCCION", [$1])}
		|FOR 																	{$$ = new nodo("INSTRUCCION", [$1])}
		|PRINT																	{$$ = new nodo("INSTRUCCION", [$1])}
		|WHILE 																	{$$ = new nodo("INSTRUCCION", [$1])}
		|SWITCH 																{$$ = new nodo("INSTRUCCION", [$1])}
		|DOWHILE																{$$ = new nodo("INSTRUCCION", [$1])}
		|FOREACH																{$$ = new nodo("INSTRUCCION", [$1])}
		|TERNARIO 																{$$ = new nodo("INSTRUCCION", [$1])}
		|break																	{$$ = new nodo("INSTRUCCION", [$1])}
		|return	E																{$$ = new nodo("INSTRUCCION", [$1,$2])}
		|return		  															{$$ = new nodo("INSTRUCCION", [$1])}
		|E																		{$$ = new nodo("INSTRUCCION", [$1])}
		|CALL
;

CALL
	:id parIzq parDer 														    {$$ = new nodo("CALL", [$1,$2,$3])}
	|id parIzq VARIABLES parDer 												{$$ = new nodo("CALL", [$1,$2,$3,$4])}
;

TERNARIO
	: parIzq CONDICIONES parDer interrogacion INSTRUCCION colon INSTRUCCION  	{$$ = new nodo("TERNARIO", [$1,$2,$3,$4,$5,$6,$7])}
;

IF 
		:if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer ELSES 		{$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6,$7,$8])}
		|if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer       		 {$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6,$7])}
		|if parIzq CONDICIONES parDer llaIzq  llaDer ELSES						 {$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6,$7])}
		|if parIzq CONDICIONES parDer llaIzq llaDer 							 {$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6])}
        |if parIzq CONDICIONES parDer INSTRUCCION ELSES  						{$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6])}
;

ELSES
		:ELSES ELSE    															{$$ = new nodo("ELSES", [$1,$2])}
		|ELSE																	 {$$ = new nodo("ELSES", [$1])}
;

ELSE 
		:else if parIzq CONDICIONES parDer llaIzq llaDer  					    {$$ = new nodo("ELSE", [$1,$2,$3,$4,$5,$6,$7])}
		|else if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer  	    {$$ = new nodo("ELSE", [$1,$2,$3,$4,$5,$6,$7,$8])}
		|else if parIzq CONDICIONES parDer INSTRUCCION 						    {$$ = new nodo("ELSE", [$1,$2,$3,$4,$5,$6])}
		|else llaIzq INSTRUCCIONES llaDer										{$$ = new nodo("ELSE", [$1,$2,$3,$4])}
		|else INSTRUCCION 											  		    {$$ = new nodo("ELSE", [$1,$2])}
		|else llaIzq llaDer														{$$ = new nodo("ELSE", [$1,$2,$3])}
;

SWITCH
		:switch parIzq id parDer llaIzq CASES llaDer 							{$$ = new nodo("SWITCH", [$1,$2,$3,$4,$5,$6,$7])}
;

CASES
		:CASES CASE  															{$$ = new nodo("CASES", [$1,$2])}
		|CASE       															 {$$ = new nodo("CASES", [$1])}
;

CASE
		:case VALOR colon  INSTRUCCIONES break ptcoma  							{$$ = new nodo("CASE", [$1,$2,$3,$4,$5,$6])}
		|case VALOR colon  INSTRUCCIONES 										{$$ = new nodo("CASE", [$1,$2,$3,$4])}
		|case VALOR colon break ptcoma 											{$$ = new nodo("CASE", [$1,$2,$3,$4,$5])}
;

WHILE
		:while parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer 			{$$ = new nodo("WHILE", [$1,$2,$3,$4,$5,$6,$7])}
		|while parIzq CONDICIONES parDer llaIzq llaDer							{$$ = new nodo("WHILE", [$1,$2,$3,$4,$5,$6])}
;

DOWHILE
		:do llaIzq INSTRUCCIONES llaDer while parIzq CONDICIONES parDer	    {$$ = new nodo("WHILE", [$1,$2,$3,$4,$5,$6,$7,$8])}
		|do llaIzq llaDer while parIzq CONDICIONES parDer 				    {$$ = new nodo("WHILE", [$1,$2,$3,$4,$5,$6,$7])}
		
;

FOR 
	:for parIzq FORVAR ptcoma FORVAR1 ptcoma FORVAR2 parDer llaIzq INSTRUCCIONES llaDer{$$ = new nodo("FOR", [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11])}
	|for parIzq FORVAR ptcoma FORVAR1 ptcoma FORVAR2 parDer llaIzq llaDer   		   {$$ = new nodo("FOR", [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10])}
;

FORVAR
	:id equal E																	{$$ = new nodo("FORVAR", [$1,$2,$3])}
	|TIPO id equal E    													    {$$ = new nodo("FORVAR", [$1,$2,$3,$4])}
;

FORVAR1
		:E menor E   															{$$ = new nodo("FORVAR1", [$1,$2,$3])}
		|E mayor E   															{$$ = new nodo("FORVAR1", [$1,$2,$3])}
		|E menorIgual E 														{$$ = new nodo("FORVAR1", [$1,$2,$3])}
		|E mayorIgual E 														{$$ = new nodo("FORVAR1", [$1,$2,$3])}
		|E equal E  															{$$ = new nodo("FORVAR1", [$1,$2,$3])}
;

FORVAR2
		:id increment  															{$$ = new nodo("FORVAR2", [$1,$2])}
		|id decrement 														    {$$ = new nodo("FORVAR2", [$1,$2])}
;

FOREACH
		:for id in FOREACH1 llaIzq INSTRUCCIONES llaDer 						{$$ = new nodo("FOREACH", [$1,$2,$3,$4,$5,$6,$7])}
		|for id in FOREACH1  llaIzq llaDer 										{$$ = new nodo("FOREACH", [$1,$2,$3,$4,$5,$6])}
;

FOREACH1
		:cadena                													{$$ = new nodo("FOREACH1", [$1])}
		|id																		{$$ = new nodo("FOREACH1", [$1])}
		|corcheteIzq VARIABLES corcheteDer										{$$ = new nodo("FOREACH1", [$1,$2,$3])}
		|id corcheteIzq digits colon digits corcheteDer  						{$$ = new nodo("FOREACH1", [$1,$2,$3,$4,$5,$6])}
		|id corcheteIzq begin colon end corcheteDer  						    {$$ = new nodo("FOREACH1", [$1,$2,$3,$4,$5,$6])}
;

E
		:E minus E																{$$ = new nodo("E", [$1,$2,$3])}
		|E asterisk E															{$$ = new nodo("E", [$1,$2,$3])}
		|E add E																{$$ = new nodo("E", [$1,$2,$3])}
		|E asterisk E															{$$ = new nodo("E", [$1,$2,$3])}
		|E pot E																{$$ = new nodo("E", [$1,$2,$3])}
		|E div E																{$$ = new nodo("E", [$1,$2,$3])}
		|E mod E																{$$ = new nodo("E", [$1,$2,$3])}
		|parIzq E parDer														{$$ = new nodo("E", [$1,$2,$3])}
		|ARRAY																	{$$ = new nodo("E", [$1])}
		|pow parIzq E comma E parDer											{$$ = new nodo("E", [$1,$2,$3,$4,$5,$6])}
		|TRIGONOMETRICA parIzq E parDer											{$$ = new nodo("E", [$1,$2,$3,$4])}
		|VALOR																	{$$ = new nodo("E", [$1])}
		|numeral id											                    {$$ = new nodo("E", [$1,$2])}
		|NATIVA																	{$$ = new nodo("E", [$1])}
	//	|id point id	                                                        {console.log("expresion")}									
		|OperarARRAY									    					{$$ = new nodo("E", [$1])}
		|id increment 															{$$ = new nodo("E", [$1,$2])}
		|id decrement															{$$ = new nodo("E", [$1,$2])}
		|E concat E 															{$$ = new nodo("E", [$1,$2,$3])}
		|minus E            %prec menosU                                        {$$ = new nodo("E", [$1,$2])}
		|E                                                                      {$$ = new nodo("E", [$1])}
		|CALL
;

NATIVA
	:E point caracterOfPosition parIzq E parDer   					 			{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5,$6])}
	|E point subString parIzq E comma E parDer			  						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5,$6,$7,$8])}
	|E point length parIzq parDer						 						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5])}
	|E point toUppercase parIzq parDer					 						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5])}
	|E point toLowercase parIzq parDer					 						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5])}
	|E point pop parIzq  parDer						 							{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5])}
	|E point push parIzq E parDer						  						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5,$6])}
;



OperarARRAY
		:TRIGONOMETRICA numeral ARITMETICA parIzq ARRAY parDer					{$$ = new nodo("OPERAR_ARRAY", [$1,$2,$3,$4,$5,$6])}
		|id numeral ARITMETICA E 												{$$ = new nodo("OPERAR_ARRAY", [$1,$2,$3,$4])}
		
;


TRIGONOMETRICA
		:sin																	{$$ = new nodo("TRIGONOMETRICA", [$1])}
		|cos																	{$$ = new nodo("TRIGONOMETRICA", [$1])}
		|tan																	{$$ = new nodo("TRIGONOMETRICA", [$1])}
;
ARRAY 
	:corcheteIzq EXPRESIONES  corcheteDer										{$$ = new nodo("ARRAY", [$1,$2,$3])}
	|corcheteIzq corcheteDer													{$$ = new nodo("ARRAY", [$1,$2])}
	|id 																		{$$ = new nodo("ARRAY", [$1])}
;		
CONDICIONES
		:CONDICIONES LOGICA COND  											{$$ = new nodo("CONDICIONES", [$1,$2,$3])}
		|COND																{$$ = new nodo("CONDICIONES", [$1])}
;

COND 
	:CONDICION															   {$$ = new nodo("COND", [$1])}
	|parIzq CONDICION parDer												{$$ = new nodo("COND", [$1,$2,$3])}
;

CONDICION
		:E equalEqual E 													{$$ = new nodo("CONDICION", [$1,$2,$3])}
		|E diferent E														{$$ = new nodo("CONDICION", [$1,$2,$3])}
		|E menor E 															{$$ = new nodo("CONDICION", [$1,$2,$3])}
		|E mayor E  														{$$ = new nodo("CONDICION", [$1,$2,$3])}
		|E mayorIgual E  													{$$ = new nodo("CONDICION", [$1,$2,$3])}
		|E menorIgual E  													{$$ = new nodo("CONDICION", [$1,$2,$3])}
		|not E 					 											{$$ = new nodo("CONDICION", [$1,$2])}
	
;
LOGICA
		:and																{$$ = new nodo("LOGICA", [$1])}
		|or																	{$$ = new nodo("LOGICA", [$1])}
		|not																{$$ = new nodo("LOGICA", [$1])}
;

PRINT
		:print parIzq E parDer												{$$ = new nodo("PRINT",  [$1,$2,$3,$4])}
		|print parIzq E comma E parDer										{$$ = new nodo("PRINT",  [$1,$2,$3,$4,$5,$6])}
		|println parIzq E parDer											{$$ = new nodo("PRINT",  [$1,$2,$3,$4])}
		|println parIzq E comma E parDer									{$$ = new nodo("PRINT",  [$1,$2,$3,$4,$5,$6])}

;

