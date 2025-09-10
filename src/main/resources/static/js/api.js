// static/js/api.js

const API_URL = "http://localhost:8080/api/auditoria";

async function buscarDadosIniciais() {
    const [resChecklist, resNC, resAderencia] = await Promise.all([
        fetch(`${API_URL}/checklist`),
        fetch(`${API_URL}/naoconformidade`),
        fetch(`${API_URL}/aderencia`)
    ]);
    
    if (!resChecklist.ok || !resNC.ok || !resAderencia.ok) {
        throw new Error('Falha ao buscar dados da API.');
    }

    const checklist = await resChecklist.json();
    const naoConformidades = await resNC.json();
    const aderencia = await resAderencia.json();
    
    return { checklist, naoConformidades, aderencia };
}

async function adicionarItemChecklist(novoItem) {
    const response = await fetch(`${API_URL}/checklist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoItem),
    });
    return response.ok;
}

async function adicionarNaoConformidade(itemChecklistId, novaNC) {
    const response = await fetch(`${API_URL}/checklist/${itemChecklistId}/naoconformidade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaNC),
    });
    return response.ok;
}

async function resolverNaoConformidade(id) {
    const response = await fetch(`${API_URL}/naoconformidade/${id}/resolver`, {
        method: 'PUT',
    });
    return response.ok;
}

async function escalonarNaoConformidade(id, email) {
    const response = await fetch(`${API_URL}/naoconformidade/${id}/escalonar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }), // Envia o email no corpo da requisição
    });
    return response.ok;
}