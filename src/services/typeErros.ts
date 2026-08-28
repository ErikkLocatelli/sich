const types = {
    email: {
        regex: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
        message: 'Preencha um email válido'
    },

    number: {
        regex: /^\d+$/, 
        message: "Utilize apenas números"
    }, 
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    }, 
    phone: {
        regex: /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/,
        message: "Preencha um número de telefone válido"
    }
}

export default types
