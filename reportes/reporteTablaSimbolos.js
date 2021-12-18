function Reportes(){
    var option = document.getElementById('reportes').value;
    if(option=="TS")
        ReporteTabla()
}
function ReporteTabla(){
    texto=""
    texto = "<!DOCTYPE html> ";
    texto+="<html lang=\"en\">";
    texto+="<head>";
    texto+="<meta charset=\"UTF-8\">";
    texto+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    texto+="<title>Reporte Tabla de simbolos</title>";
    texto+="<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">";
    texto+="<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\" integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\" crossorigin=\"anonymous\"></script>";
    texto+="</head>";
    texto+="<body>";
    texto+="<H1>Lista de Simbolos</H1>";
    texto+= "<table class=\"table\"><thead class=\"thead-dark\"> \n";
    texto+="<tr> \n";
    texto+= "<th scope=\"col\">ID</th> \n";
    texto+= "<th scope=\"col\">Tipo</th> \n";
    texto+= "<th scope=\"col\">valor</th> \n";
    texto+= "<th scope=\"col\">Fila</th> \n";
    texto+= "<th scope=\"col\">Columna</th> \n";
    texto+= "<th scope=\"col\">Entorno</th> \n";
    texto+= "</tr> \n";
    texto+= "</thead> \n";
    texto+= "<tbody>";
    texto+= "";

    entornoGlobal.forEach(entorno  => {
        console.log(entorno)
    });



    texto+= "</tbody> \n";
    texto+= "</table> \n";

    texto+="</body>";
    texto+="</html>";

    var nueva_ventana = window.open('../Reporte_Tabla','_blank');
    nueva_ventana.document.write(texto);
};