import { calcPrecoKWH, calcularConsumoPorCasa, calcularPrecoPorCasa, calcularTotalConsumo, calcValorDiferenca } from "../src"


test("Deve calcular o preço por casa", () => {
    const TOTAL_KWH = 659;
    const TOTAL_PRECO_FATURA = 675.99;


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
    
    const kwhPorCasa = calcularConsumoPorCasa(CONSUMO_MES_ANTERIOR, CONSUMO_MES_ATUAL);
    const totalConsumoKwhPorCasa = calcularTotalConsumo(kwhPorCasa);
    const preco_kwh = calcPrecoKWH(TOTAL_PRECO_FATURA, TOTAL_KWH);
    const valorDiferenca = calcValorDiferenca(totalConsumoKwhPorCasa, TOTAL_KWH, preco_kwh)
    const precoPorCasa = calcularPrecoPorCasa(kwhPorCasa, totalConsumoKwhPorCasa, valorDiferenca, preco_kwh);
    expect(precoPorCasa.Adriana).toBe(197.85886969397856)
    expect(precoPorCasa.Rosana).toBe(106.10307008884496)
    expect(precoPorCasa.Janete).toBe(372.0280602171766)
})