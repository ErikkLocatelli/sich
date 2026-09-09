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
        regex: /^.{8,}$/,
        message: "Use pelo menos 8 caracteres. Recomendamos uma frase longa e fácil de lembrar"
    }, 
    phone: {
        regex: /^\(\d{2}\) 9\d{4}-\d{4}$/,
        message: "Preencha um número de telefone válido"
    }
}

export default types
