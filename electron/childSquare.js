process.on("message", (msg) => {
  if (msg.action === "square") {
    const result = Number(msg.number) ** 2;
    console.log(result)
    process.send({ type: "square-result", value: result });
  }
});