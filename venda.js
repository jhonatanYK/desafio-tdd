function calcularVenda(venda) {
  let subtotal = 0;

  venda.itens.forEach(item => {
    const descontoPercentual = (item.valorItem * item.descontoPercentual) / 100;
    const maiorDesconto = Math.max(descontoPercentual, item.descontoReal);

    const descontoAplicado = Math.min(maiorDesconto, item.valorItem);
    item.valorFinal = item.valorItem - descontoAplicado;

    subtotal += item.valorFinal;
  });

  let descontoTotalPercentual = venda.descontoTotalPercentual || 0;
  if (venda.descontoTotalReal && subtotal > 0 && !venda.descontoTotalPercentual) {
    descontoTotalPercentual = (venda.descontoTotalReal / subtotal) * 100;
  }

  const descontoTotalPercentualCalculado = (subtotal * descontoTotalPercentual) / 100;
  const maiorDescontoTotal = Math.max(descontoTotalPercentualCalculado, venda.descontoTotalReal || 0);

  const descontoTotalAplicado = Math.min(maiorDescontoTotal, subtotal);

  const totalFinal = subtotal - descontoTotalAplicado;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    descontoTotalPercentual: parseFloat(descontoTotalPercentual.toFixed(2)),
    descontoTotalReal: parseFloat(descontoTotalAplicado.toFixed(2)),
    totalFinal: parseFloat(totalFinal.toFixed(2)),
  };
}

module.exports = calcularVenda;