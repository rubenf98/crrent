export const text = {
    titles: ["Dados da sua reserva", "Seguro", "Extras", "Informação Do Cliente", "Condutor Principal", "Condutor Adicional", "Método de pagamento"],
    extras: {
        "Cobertura SCDW": "Cobertura SCDW",
        "Cobertura vidros e pneus": "Cobertura vidros e pneus",
        "Condutor adicional": "Condutor adicional",
        "Cadeira de bébé": "Cadeira de bébé",
        "Assento de criança": "Assento de criança"
    },
    prices: {
        per: "por",
        day: "dia",
        uni: "uni"
    },
    descriptions: {
        manual: "manual",
        automatic: "automático",
        gasoline: "gasolina",
        hybrid: "híbrido",
        eletric: "elétrico",
        diesel: "diesel"
    },
    insurance: {
        button: "selecionado",
        basic: {
            title: "Básico",
            items: ["Cobertura CDW (Collision Damage Waiver)", "Sujeito a franquia / depósito de segurança"]
        },
        premium: {
            title: "Premium",
            items: ["Cobertura Premium - SCDW (Super Collision Damage Waiver)", "Possíveis danos estão cobertos", "Não é necessário cartão de crédito"]
        }
    },
    placeholder: {
        date: ["data levantamento", "horário levantamento", "data devolução", "horário devolução"],
        pickup_place: {
            label: "local levantamento",
            options: ["Aeroporto", "Loja"],
            tax: "Fora",
            placeholder: "Indique outra morada ou hotel"
        },
        return_place: {
            label: "local devolução",
            options: ["Aeroporto", "Loja"],
            tax: "Fora",
            placeholder: "Indique outra morada ou hotel"
        },
        flight: "número de voo",
        client: {
            name: "Nome*",
            cc: "ID/Passaporte*",
            nif: "Número de Identificação Fiscal (NIF)*",
            address: "Morada*",
            country: "País*",
            postal_code: "Código Postal*",
            email: "Email*",
            phone: "Número de telemóvel*",
            local_address: "Endereço local / hotel*",
            company: "Companhia"
        },
        driver: {
            name: "Nome*",
            birthday: "Data de nascimento*",
            license: "Número Carta Condução*",
            emission: "Data de Emissão*",
            validity: "Data de validade*",
            emission_place: "Local de Emissão*",
        },
    },
    button: "reservar",
    notice: "Inclui IVA a 22%",
    error: "Ocorreu os seguintes erros com a reserva",
    payments: [{
        id: 1,
        name: "Cartão de crédito",
        image: "/icon/credit_card.svg"
    },
    {
        id: 2,
        name: "Pagar no levantamento",
        image: "/icon/money.svg"
    }]
} 
