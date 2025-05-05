function gerarDiaDaSemana() {
    const diaDaSemana = new Date().toLocaleDateString("pt-BR", {
        weekday: "long"
    });

    const diaDaSemanaCapitalizado = diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1);

    const data = new Date().toLocaleDateString("pt-BR");
    const hora = new Date().toLocaleTimeString("pt-BR", {
        hour: "numeric",
        minute: "numeric"
    })
    const dataCompleta = `${diaDaSemanaCapitalizado} (${data}) às ${hora}`;

    return dataCompleta;
}

export default gerarDiaDaSemana;