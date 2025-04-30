const TOTAL_KWH = 659;
const TOTAL_PRECO_FATURA = 675.99;
const PRECO_KWH = TOTAL_PRECO_FATURA / TOTAL_KWH;

const CONSUMO_MES_ANTERIOR = {
    Adriana: 3087.5,
    Rosana: 1345.7,
    Janete: 3884.9,
};

const CONSUMO_MES_ATUAL = {
    Adriana: 3265.4,
    Rosana: 1441.1,
    Janete: 4219.4,
};

function calcularConsumoPorCasa(consumoAnterior, consumoAtual) {
    return Object.keys(consumoAtual).reduce((acc, casa) => {
        acc[casa] = consumoAtual[casa] - consumoAnterior[casa];
        return acc;
    }, {});
}

const kwhPorCasa = calcularConsumoPorCasa(CONSUMO_MES_ANTERIOR, CONSUMO_MES_ATUAL);

const totalKwhConsumido = Object.keys(kwhPorCasa).reduce((cc, casa) => kwhPorCasa[casa] + cc, 0)

const valorConsumido = totalKwhConsumido * PRECO_KWH;

function calcularTotalConsumo(kwhPorCasa) {
    return Object.values(kwhPorCasa).reduce((acc, current) => acc + current, 0);
}

const totalConsumoKwhPorCasa = calcularTotalConsumo(kwhPorCasa);
const diferencaKwh = TOTAL_KWH - totalConsumoKwhPorCasa;
const valorDiferenca = diferencaKwh * PRECO_KWH;

function calcularPrecoPorCasa(kwhPorCasa, totalConsumoKwhPorCasa, valorDiferenca, precoKwh) {
    return Object.entries(kwhPorCasa).reduce((acc, [nome, kwh]) => {
        const percentualConsumo = kwh / totalConsumoKwhPorCasa;
        const ajusteValor = percentualConsumo * valorDiferenca;
        acc[nome] = (kwh * precoKwh) + ajusteValor;
        return acc;
    }, {});
}

const precoPorCasa = calcularPrecoPorCasa(kwhPorCasa, totalConsumoKwhPorCasa, valorDiferenca, PRECO_KWH);

function converterMoeda(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function arredondarValor(valor) {
    return parseFloat(valor.toFixed(2));
}

function imprimirRelatorio(kwhPorCasa, totalKwh, totalPrecoFatura, precoKwh, valorDiferenca, precoPorCasa, totalKwhConsumido, valorConsumido) {
    console.log(`Resumo Geral de Consumo e Custos de Energia`);
    console.log(`- kWh Consumidos light: ${totalKwh} kWh`);
    console.log(`- Valor Total da Fatura: ${converterMoeda(totalPrecoFatura)}`);
    console.log(`- Custo Médio por kWh: ${converterMoeda(precoKwh)}`);

    console.log(`\nCusto Final por Residência:`);
    Object.entries(kwhPorCasa).forEach(([nome, kwh]) => {
        console.log(`- Consumo na residência de ${nome}: ${arredondarValor(kwh)} kWh`);
    });

    console.log(`Total kwh calculado ${totalKwhConsumido.toFixed(2)}`)

    console.log(`\nCálculo de Custos Adicionais:`);
    console.log(`- Valor adicional distribuído por kWh não atribuído: ${converterMoeda(valorDiferenca)} por residência`);

    console.log(`\nDetalhamento do Consumo por Residência e Custos Finais:`);
    Object.entries(precoPorCasa).forEach(([nome, preco]) => {
        console.log(`- Residência de ${nome}: ${arredondarValor(kwhPorCasa[nome])} kWh, Custo: ${converterMoeda(preco)}`);
    });

    const precoTotalRecolhido = Object.values(precoPorCasa).reduce((acc, current) => acc + current, 0);
    console.log(`\nTotalização:`);
    console.log(`- Valor Total Recolhido das Residências: ${converterMoeda(precoTotalRecolhido)}`);

    console.log(`\nDiferenças:`);
    console.log(`- kWh Consumidos marcador: ${arredondarValor(totalKwhConsumido)} kWh`);
    console.log(`- Valor Total Consumido: ${converterMoeda(valorConsumido)}`);
    console.log(`- Valor pago a mais: ${converterMoeda(precoTotalRecolhido - valorConsumido)}`);
    console.log(`- Valor kwh de diferença: ${(TOTAL_KWH - totalKwhConsumido).toFixed(2)}`)
}

imprimirRelatorio(kwhPorCasa, TOTAL_KWH, TOTAL_PRECO_FATURA, PRECO_KWH, valorDiferenca, precoPorCasa, totalKwhConsumido, valorConsumido);
