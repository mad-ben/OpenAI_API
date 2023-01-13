// General Model to answer questions
export const aiModel1 = {
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 100,
    top_p:1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: "",
};

// Coding Model to answer questions
export const aiModel2 = {
    model: "code-davinci-002",
    temperature: 0,
    max_tokens: 64,
    top_p:1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: "",
};

// Coding Model QnA
export const aiModel3 = {
    model: "text-davinci-003",
    temperature: 0.5,
    max_tokens: 100,
    top_p:1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: "",
};

// Coding Model Translation
export const aiModel4 = {
    model: "text-davinci-003",
    temperature: 1,
    max_tokens: 100,
    top_p:1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: "",
};