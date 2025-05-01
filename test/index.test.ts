function sum(a: number, b: number) {
    return a + b;
}

test("deve somar dois números", ()=>{
    const result = sum(1, 2)
    expect(result).toBe(3)
})