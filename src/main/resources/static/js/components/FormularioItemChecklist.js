// static/js/components/FormularioItemChecklist.js

function FormularioItemChecklist({ onAdicionar }) {
    const [item, setItem] = React.useState('');
    const [responsavel, setResponsavel] = React.useState('');
    const [classificacao, setClassificacao] = React.useState('Baixa');
    const [status, setStatus] = React.useState('SIM');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item || !responsavel) {
            alert('Preencha todos os campos!');
            return;
        }
        onAdicionar({ item, responsavel, classificacao, status });
        setItem('');
        setResponsavel('');
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header">Adicionar Item ao Checklist</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Item</label>
                        <input type="text" className="form-control" value={item} onChange={e => setItem(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Responsável</label>
                        <input type="text" className="form-control" value={responsavel} onChange={e => setResponsavel(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Classificação</label>
                        <select className="form-select" value={classificacao} onChange={e => setClassificacao(e.target.value)}>
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="SIM">Sim</option>
                            <option value="NAO">Não</option>
                            <option value="NAO_SE_APLICA">Não se Aplica</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Adicionar</button>
                </form>
            </div>
        </div>
    );
}