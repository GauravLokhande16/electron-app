
process.on('message', (msg) => {
  if (msg && msg.action === 'multiply') {
    const { number } = msg;
    const numeric = Number(number);
    if (Number.isNaN(numeric)) {
      process.send({ type: 'result', error: 'Invalid number' });
      return;
    }
    const result = numeric * 2;

    process.send({ type: 'result', value: result });
  }
});

process.on('disconnect', () => {
  process.exit(0);
});
