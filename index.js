const fs = require('fs');
const papa = require('papaparse');
const {
    performance
  } = require('perf_hooks');
var count = 0;
var tempo  = [];
var tempoSalvando  = [];
var valorminmax = [2];
var valorMedia = 0;
var soma = 0;


console.time('Tempo para abrir o CSV');
const file = fs.createReadStream('brasil.csv');
console.timeEnd('Tempo para abrir o CSV');

    
papa.parse(file, {
    header: true,
	step: function(row) {   
        var linha = row.data;
        count++;
        calculaRegistro(row.data);
        salvaArquivo(linha);
           
	},
	complete: function(results, file) {  
        printaResultado()

    },
    meta: function(){
        console.log(fields);
    }
});



function calculaRegistro(data){   
    var t0 = performance.now();
    var t1 = performance.now();
    tempo.push((t1 - t0)) 
}

function calculaMenorMaior(data){

    Array.min = function(array) {
        return Math.min.apply(Math, array);
    };
    
    Array.max = function(array) {
        return Math.max.apply(Math, array);
    };
    
    valorminmax[1]= Array.max(data);
    valorminmax[0]= Array.min(data);


    return valorminmax;

}


function calculaMedia(recebe){

soma = recebe.reduce((partial_sum, a) => partial_sum + a,0); 
valorMedia = (soma / count);

return valorMedia;


}


function salvaArquivo(linha){
    var t0 = performance.now();
    fs.appendFile("E:\\Trabalho Node\\TrabalhoPapaParse\\arquivo.json", JSON.stringify(linha), function(erro) {
        if(erro) {
            throw erro;
        }  
    }); 
    var t1 = performance.now();
    tempoSalvando.push((t1 - t0)) 
}

function printaResultado(){

console.log("Menor e Maior tempo convertendo",calculaMenorMaior(tempo))
console.log("Tempo Medio convertendo", calculaMedia(tempo)+ "ms");
console.log("-------#--------#-------#-------#--------#-------#-------#--------#-------#-------#--------#-------#-------#--------#-------#")

console.log("Menor e Maior tempo salvando",calculaMenorMaior(tempoSalvando))
console.log("Tempo Medio Salvando", calculaMedia(tempoSalvando) + "ms");


}