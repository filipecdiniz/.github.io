const numero = 12343221.78;

const numeroFormatado = numero.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

console.log(numeroFormatado);