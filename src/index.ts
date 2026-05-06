export const TOTAL_KWH = 635;
const TOTAL_PRECO_FATURA = 642.47;

export function calcPrecoKWH(TOTAL_PRECO_FATURA: any, TOTAL_KWH: any) {
    return TOTAL_PRECO_FATURA / TOTAL_KWH;
}

export const PRECO_KWH = calcPrecoKWH(TOTAL_PRECO_FATURA, TOTAL_KWH);

export const CONSUMO_MES_ANTERIOR = {
    Adriana: 5800.1,
    Rosana: 2541.2,
    Janete: 7591.9,
};

export const CONSUMO_MES_ATUAL = {
    Adriana: 5929.1,
    Rosana: 2635.1,
    Janete: 7921.2,
};

export function calcularConsumoPorCasa(consumoAnterior: any, consumoAtual: any) {
    return Object.keys(consumoAtual).reduce((acc: any, casa) => {
        acc[casa] = consumoAtual[casa] - consumoAnterior[casa];
        return acc;
    }, {});
}

const kwhPorCasa = calcularConsumoPorCasa(CONSUMO_MES_ANTERIOR, CONSUMO_MES_ATUAL);

const totalKwhConsumido = Object.keys(kwhPorCasa).reduce((cc, casa) => kwhPorCasa[casa] + cc, 0)

const valorConsumido = totalKwhConsumido * PRECO_KWH;

export function calcularTotalConsumo(kwhPorCasa: any): any {
    return Object.values(kwhPorCasa).reduce((acc: any, current: any) => acc + current, 0);
}

const totalConsumoKwhPorCasa = calcularTotalConsumo(kwhPorCasa);

export function calcValorDiferenca(totalConsumoKwhPorCasa: any, totalKwh: any, precoKwh: any) {
    const diferencaKwh = totalKwh - totalConsumoKwhPorCasa;
    const valorDiferenca = diferencaKwh * precoKwh;
    return valorDiferenca;
}

const valorDiferenca = calcValorDiferenca(totalConsumoKwhPorCasa, TOTAL_KWH, PRECO_KWH);

export function calcularPrecoPorCasa(kwhPorCasa: any, totalConsumoKwhPorCasa: any, valorDiferenca: any, precoKwh: any) {
    return Object.entries(kwhPorCasa).reduce((acc: any, [nome, kwh]: any[]) => {
        const percentualConsumo = kwh / totalConsumoKwhPorCasa;
        const ajusteValor = percentualConsumo * valorDiferenca;
        acc[nome] = (kwh * precoKwh) + ajusteValor;
        return acc;
    }, {});
}

const precoPorCasa = calcularPrecoPorCasa(kwhPorCasa, totalConsumoKwhPorCasa, valorDiferenca, PRECO_KWH);

function converterMoeda(value: any) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function arredondarValor(valor: any) {
    return parseFloat(valor.toFixed(2));
}

function imprimirRelatorio(kwhPorCasa: any, totalKwh: any, totalPrecoFatura: any, precoKwh: any, valorDiferenca: any, precoPorCasa: any, totalKwhConsumido: any, valorConsumido: any) {
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

    const precoTotalRecolhido: any = Object.values(precoPorCasa).reduce((acc: any, current) => acc + current, 0);
    console.log(`\nTotalização:`);
    console.log(`- Valor Total Recolhido das Residências: ${converterMoeda(precoTotalRecolhido)}`);

    console.log(`\nDiferenças:`);
    console.log(`- kWh Consumidos marcador: ${arredondarValor(totalKwhConsumido)} kWh`);
    console.log(`- Valor Total Consumido: ${converterMoeda(valorConsumido)}`);
    console.log(`- Valor pago a mais: ${converterMoeda(precoTotalRecolhido - valorConsumido)}`);
    console.log(`- Valor kwh de diferença: ${(TOTAL_KWH - totalKwhConsumido).toFixed(2)}`)
}

imprimirRelatorio(kwhPorCasa, TOTAL_KWH, TOTAL_PRECO_FATURA, PRECO_KWH, valorDiferenca, precoPorCasa, totalKwhConsumido, valorConsumido);
