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
    max_tokens: 256,
    top_p:1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: "",
};