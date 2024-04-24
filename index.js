const totalKwh = 807;
const totalPrecoFatura = 808.46;
const precoKwh = totalPrecoFatura / totalKwh;
console.log("f2")

const kwhPorCasa = {
    Adriana: 372.7,
    Rosana: 125.1,
    Janete: 422.2
};

// Calcula o total de consumo pelas casas
const totalConsumoKwhPorCasa = Object.values(kwhPorCasa).reduce((acc, current) => acc + current, 0);

// Determina a diferença entre o total de kWh faturado e o consumo reportado pelas casas
const diferencaKwh = totalKwh - totalConsumoKwhPorCasa;

// Calcula o custo ou crédito resultante dessa diferença
const valorDiferenca = diferencaKwh * precoKwh;

// Ajusta o cálculo de custo para cada casa com base na diferença
const precoPorCasa = Object.entries(kwhPorCasa).reduce((acc, [nome, kwh]) => {
    const percentualConsumo = kwh / totalConsumoKwhPorCasa;
    const ajusteValor = percentualConsumo * valorDiferenca;
    acc[nome] = (kwh * precoKwh) + ajusteValor;
    return acc;
}, {});

function converterMoeda(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

console.log(`Resumo Geral de Consumo e Custos de Energia`);
console.log(`- kWh Consumidos: ${totalKwh} kWh`);
console.log(`- Valor Total da Fatura: ${converterMoeda(totalPrecoFatura)}`);
console.log(`- Custo Médio por kWh: ${converterMoeda(precoKwh)}`);

console.log(`\nCusto Final por Residência:`);
Object.entries(kwhPorCasa).forEach(([nome, kwh]) => {
    console.log(`- Consumo na residência de ${nome}: ${kwh} kWh`);
});

console.log(`\nCálculo de Custos Adicionais:`);
console.log(`- Valor adicional distribuído por kWh não atribuído: ${converterMoeda(valorDiferenca)} por residência`);

console.log(`\nDetalhamento do Consumo por Residência e Custos Finais:`);
Object.entries(precoPorCasa).forEach(([nome, preco]) => {
    console.log(`- Residência de ${nome}: ${kwhPorCasa[nome]} kWh, Custo: ${converterMoeda(preco)}`);
});


const precoTotalRecolhido = Object.values(precoPorCasa).reduce((acc, current) => acc + current, 0);
console.log(`\nTotalização:`);
console.log(`- Valor Total Recolhido das Residências: ${converterMoeda(precoTotalRecolhido)}`);