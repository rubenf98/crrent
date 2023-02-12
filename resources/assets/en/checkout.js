export const text = {
    titles: ["data on your reservation", "Insurance", "Addons", "Client Information", "Main Driver", "Additional Driver", "Payment method"],
    extras: {
        "Cobertura SCDW": "SCDW cover",
        "Cobertura vidros e pneus": "Windows and tyres coverage",
        "Condutor adicional": "Additional driver",
        "Cadeira de bébé": "Baby seat",
        "Assento de criança": "Child seat"
    },
    descriptions: {
        manual: "manual",
        automatic: "automatic",
        gasoline: "gasoline",
        hybrid: "hybrid",
        eletric: "eletric",
        diesel: "diesel"
    },
    prices: {
        per: "per",
        day: "day",
        uni: "uni"
    },
    insurance: {
        button: "selected",
        basic: {
            title: "Basic",
            items: ["CDW (Collision Damage Waiver) protection", "Subject to a excess / security deposit"]
        },
        premium: {
            title: "Premium",
            items: ["Premium coverage - SCDW (Super Collision Damage Waiver)", "Possible damages are covered", "No credit card required"]
        }
    },
    placeholder: {
        date: ["pickup date", "pickup time", "return date", "return time"],
        pickup_place: {
            label: "pickup place",
            options: ["Airport", "Store"],
            tax: "Outside",
            placeholder: "Please enter other address or hotel name"
        },
        return_place: {
            label: "return place",
            options: ["Airport", "Store"],
            tax: "Outside",
            placeholder: "Please enter other address or hotel name"
        },
        flight: "flight number",
        client: {
            name: "Name*",
            cc: "ID/Passport*",
            nif: "Taxpayer Identification Number (TIF)*",
            address: "Address*",
            country: "Country*",
            postal_code: "Postal Code*",
            email: "Email*",
            phone: "Phone number*",
            local_address: "Local address / hotel*",
            company: "Company"
        },
        driver: {
            name: "Name*",
            birthday: "Birth date*",
            license: "Driver's License number*",
            emission: "Date of Issue*",
            validity: "Date of Expiry*",
            emission_place: "Place of issue*",
        },
    },
    button: "book",
    notice: "Includes 22% VAT",
    error: "The following errors during the reservation",
    payments: [{
        id: 1,
        name: "Credit card",
        image: "/icon/credit_card.svg"
    },
    {
        id: 2,
        name: "Pay at pickup",
        image: "/icon/money.svg"
    }]
} 
